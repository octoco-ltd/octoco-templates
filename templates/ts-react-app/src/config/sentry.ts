import * as Sentry from '@sentry/react';
import React from 'react';
import {
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { env } from 'src/env';

/**
 * Sentry configuration object for error tracking and monitoring.
 */
/**
 * Configuration object for Sentry error tracking and monitoring.
 */
export const sentryConfig = {
    /**
     * The Data Source Name (DSN) for Sentry.
     */
    dsn: env.REACT_APP_SENTRY_DSN,

    /**
     * The depth of Redux state context for normalization.
     */
    normalizeDepth: 5, 

    /**
     * Integrations to enhance error tracking and monitoring.
     */
    integrations: [
        /**
         * Enable browser tracing for distributed tracing.
         */
        new Sentry.BrowserTracing({
            /**
             * URLs for which distributed tracing should be enabled.
             */
            tracePropagationTargets: [
                'localhost',
                env.REACT_APP_APP_BASE_URL,
            ],
            /**
             * React Router v6 routing instrumentation.
             */
            routingInstrumentation: Sentry.reactRouterV6Instrumentation(
                React.useEffect,
                useLocation,
                useNavigationType,
                createRoutesFromChildren,
                matchRoutes,
            ),
        }),
        /**
         * Replay integration for error replay.
         */
        new Sentry.Replay(),
    ],

    /**
     * The environment label for your application.
     */
    environment: env.REACT_APP_DEPLOYMENT_ENV,

    /**
     * The sample rate for capturing transactions in performance monitoring.
     * In production, only capture 50% of the transactions.
     */
    tracesSampleRate: env.REACT_APP_DEPLOYMENT_ENV === 'production' ? 0.5 : 1.0,

    /**
     * The sample rate for replaying sessions.
     * Set to 10% in development and lower rate in production.
     */
    replaysSessionSampleRate: 0.1,

    /**
     * The sample rate for replaying sessions where errors occur.
     * Set to 100% if not already sampling the entire session.
     */
    replaysOnErrorSampleRate: 1.0,
};


//RELEASES
// # Install the cli
// curl -sL https://sentry.io/get-cli/ | SENTRY_CLI_VERSION="2.2.0" bash

// # Setup configuration values
// SENTRY_AUTH_TOKEN=<>
// SENTRY_ORG=<>
// SENTRY_PROJECT=<>
// VERSION=`sentry-cli releases propose-version`

// # Workflow to create releases
// sentry-cli releases new "$VERSION"
// sentry-cli releases set-commits "$VERSION" --auto
// sentry-cli releases finalize "$VERSION"