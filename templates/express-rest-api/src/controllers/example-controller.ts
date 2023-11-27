import { Request, Response } from 'express';
import { ResultWithValue } from '../models/result-models/results';
import * as httpCodes from 'http-status-codes';
import { BadRequest, handleControllerLevelError } from '../utils/errors';

import { ExampleService } from '../services/example-service';

import { captureException } from '@sentry/node';
import {ExampleIMSchema, ExampleVM} from "../models/users/example-schema";

export class ExampleController {
    constructor(private exampleService: ExampleService) {
    }

    public async createAnExample(req: Request, res: Response) {
        /*
            Creates an example
             */
        try {
            console.log('EXAMPLE')
            console.log(req.body)
            const exampleBody = ExampleIMSchema.safeParse(req.body);

            if (!exampleBody.success) {
                throw new BadRequest(`Request body missing fields`, exampleBody.error.errors);
            }

            const example = await this.exampleService.createExample(exampleBody.data)

            const tempResult: ResultWithValue<ExampleVM> = {
                isSuccess: true,
                value: example,
                httpStatus: httpCodes.StatusCodes.OK,
                errorMessage: '',
            };
            return res.status(tempResult.httpStatus).send(tempResult);
        } catch (err: any) {
            await captureException(err)
            return handleControllerLevelError(
                res,
                req,
                err,
                `ExampleController - createAnExample Error: ${err.message}`,
            );
        }
    }

    public async getAllExamples(req: Request, res: Response) {
        /*
            Fetches all examples
             */
        try {
            const examples = await this.exampleService.getAllExamples()
            const tempResult: ResultWithValue<ExampleVM[]> = {
                isSuccess: true,
                value: examples,
                httpStatus: httpCodes.StatusCodes.OK,
                errorMessage: '',
            };
            return res.status(tempResult.httpStatus).send(tempResult);
        } catch (err: any) {
            await captureException(err)
            return handleControllerLevelError(
                res,
                req,
                err,
                `ExampleController - getAllExamples Error: ${err.message}`,
            );
        }
    }

    public async getExampleById(req: Request, res: Response) {
        /*
            Fetch a specific example
             */
        try {
            const id = req.params.id;
            if (!id) throw new BadRequest('ID must be defined');
            const example = await this.exampleService.getExampleById(id)
            const tempResult: ResultWithValue<ExampleVM> = {
                isSuccess: true,
                value: example,
                httpStatus: httpCodes.StatusCodes.OK,
                errorMessage: '',
            };
            return res.status(tempResult.httpStatus).send(tempResult);
        } catch (err: any) {
            await captureException(err)
            return handleControllerLevelError(
                res,
                req,
                err,
                `ExampleController - getExampleById Error: ${err.message}`,
            );
        }
    }
}
