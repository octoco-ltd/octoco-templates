import swaggerJsdoc from 'swagger-jsdoc';
import {
    ExampleIMSwagger,
    ExampleVMSwagger,
} from '../models/users/example-schema';


const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Basecamp CRM REST API',
            version: '0.1.0',
            description: 'This is the Basecamp CRM REST API documentation',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'James de Villiers',
                url: 'https://www.octoco.ltd',
                email: 'james@octoco.ltd',
            },
        },
        components: {
            schemas: {
                ExampleVM: ExampleVMSwagger?.definitions?.ExampleVM,
                ExamplesVMArr: {
                    type: 'array',
                    items: ExampleVMSwagger?.definitions?.ExampleVM,
                },
                ExampleIM: ExampleIMSwagger?.definitions?.ExampleIM
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'body',
                    name: 'api-secret-token',
                },
                ServerApiKey: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key'

                }
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },

            {
                url: 'http://basecamp-rest-api-development.azurewebsites.net/',
            }
        ],
    },

    apis: ['./src/routes/*.ts'],
};

export const swaggerSpecs = swaggerJsdoc(options);
