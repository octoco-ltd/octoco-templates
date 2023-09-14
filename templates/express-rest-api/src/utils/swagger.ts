import swaggerJsdoc from 'swagger-jsdoc';
import {
    UserAccountBalanceSwagger,
    UserIMSwagger,
    UserKYCDetailsVMSwagger,
    UserVMSwagger,
} from '../models/users/user-schema';
import { UpdateUserMetadataIMSwagger } from '../models/users/user-schema';


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
                UserVM: UserVMSwagger?.definitions?.UserVM,
                AllUsersVM: {
                    type: 'array',
                    items: UserVMSwagger?.definitions?.UserVM,
                },
                UserIM: UserIMSwagger?.definitions?.UserIM,
                UpdateUserMetadataIM: UpdateUserMetadataIMSwagger?.definitions?.UpdateUserMetadataIM,
                CreateSumsubApplicantIM: CreateSumsubApplicantIMSchemaSwagger?.definitions?.CreateSumsubApplicantIM,
                SumsubApplicantStatusVM: SumsubApplicantStatusSchemaSwagger?.definitions?.SumsubApplicantStatusVM,
                UserKYCDetailsVM: UserKYCDetailsVMSwagger?.definitions?.UserKYCDetailsVM,
                CreateDepositRequestBody: CreateDepositRequestBodySwagger?.definitions?.CreateDepositRequestBody,
                UserAccountBalanceVM: UserAccountBalanceSwagger?.definitions?.UserAccountBalanceVM,
                DepositVM: DepositVMSwagger?.definitions?.DepositVM,
                AllDeposits: {
                    type: 'array',
                    items: DepositVMSwagger?.definitions?.DepositVM,
                },
                CreateWithdrawalRequest: CreateWithdrawalRequestSwagger?.definitions?.CreateWithdrawalRequestBody,
                CreateWithdrawalResponse: CreateWithdrawalResponseSwagger?.definitions?.CreateWithdrawalResponse,
                ExecuteWithdrawalRequest: ExecuteWithdrawalRequestSwagger?.definitions?.ExecuteWithdrawalRequest,
                CreateTradeBody: CreateTradeSwagger?.definitions?.CreateTradeBody
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
