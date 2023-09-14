import * as admin from 'firebase-admin';
import { env } from './env';

// This must happen before the below imports

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(env.FIREBASE_ADMIN_CERT)),
    databaseURL: 'databaseURL',
});

import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import defaultRoutes from './routes/default-routes';
import userRoutes from './routes/user-routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './utils/swagger';

import * as Sentry from "@sentry/node";


class App {
    public app: express.Application;

    constructor() {
        // Config
        this.app = express();

        Sentry.init({
            dsn: env.SENTRY_CONNECTION_STRING,
            environment: env.NODE_ENV,
            integrations: [
                // enable HTTP calls tracing
                new Sentry.Integrations.Http({
                    tracing: true
                }),
                // enable Express.js middleware tracing
                new Sentry.Integrations.Express({
                    app: this.app
                }),
            ],
            // Performance Monitoring
            tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
        });


        // Trace incoming requests
        this.app.use(Sentry.Handlers.requestHandler());
        this.app.use(Sentry.Handlers.tracingHandler());

        this.expressSetup();


        morgan.token('uid', (req: any) => {
            return req.auth?.payload;
        });

        morgan.token('body', (req: any) => {
            return req.body
        });

        morgan.token('query', (req: any) => {
            return req.query
        });

        function jsonFormat(tokens: any, req: any, res: any) {
            return JSON.stringify({
                requestId: res.locals.requestId,
                time: tokens['date'](req, res, 'iso'),
                method: tokens['method'](req, res),
                url: tokens['url'](req, res),
                'status-code': tokens['status'](req, res),
                referrer: tokens['referrer'](req, res),
                'user-agent': tokens['user-agent'](req, res),
                userId: tokens['uid'](req, res),
                body: tokens['body'](req, res),
                query: tokens['query'](req, res),
            });
        }

        this.app.use(morgan(jsonFormat));

        // Swagger docs
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

        // Routes
        this.app.use('/', defaultRoutes);
        this.app.use('/users/', userRoutes);


        // Debug endpoint for sentry
        this.app.get("/debug-sentry", function mainHandler(_: Request, __: Response) {
            throw new Error("My second Sentry error!");
        });

        // Sentry error handler
        // The error handler must be registered before any other error middleware and after all controllers
        this.app.use(Sentry.Handlers.errorHandler());

    }

    private expressSetup(): void {
        this.app.use(express.json());
        this.app.use(cors()); // Default CORS settings applied
    }
}

export default new App().app;
