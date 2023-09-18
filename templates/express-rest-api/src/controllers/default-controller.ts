import { Request, Response } from 'express';
import { ResultWithValue } from '../models/result-models/results';
import * as httpCodes from 'http-status-codes';
import { handleControllerLevelError } from '../utils/errors';
import { captureException } from '@sentry/node';


export class DefaultController {
    public async defaultEndpoint(req: Request, res: Response) {
        /*
            Default endpoint for the Example API
             */
        try {
            const tempResult: ResultWithValue<string> = {
                isSuccess: true,
                value: 'Example API is running!',
                httpStatus: httpCodes.StatusCodes.OK,
                errorMessage: '',
            };
            return res.status(tempResult.httpStatus).send(tempResult.value);
        } catch (err: any) {
            await captureException(err)
            return handleControllerLevelError(res, req, err, `defaultController - defaultEndpoint Error: ${err.message}`)
        }
    }
}
