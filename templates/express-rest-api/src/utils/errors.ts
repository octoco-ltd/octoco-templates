import * as httpCodes from 'http-status-codes';
import { Request, Response } from 'express';
import { ResultWithValue } from '../models/result-models/results';

/* tslint:disable:max-classes-per-file */
export enum ErrorType {
    NotFound = 'NotFound',
    BadRequest = 'BadRequest',
    InternalError = 'InternalError',
    Unauthorized = 'Unauthorized',
    PaymentRequired = 'PaymentRequired',
}

export class NotFoundError extends Error {
    type = ErrorType.NotFound;
    constructor(message: string) {
        super(message);
    }
}

export class BadRequest extends Error {
    type = ErrorType.BadRequest;
    issues?: any[];
    constructor(message: string, issues?: any[]) {
        super(message);
        this.issues = issues;
    }
}

export class UnAuthorized extends Error {
    type = ErrorType.Unauthorized;
    constructor(message: string) {
        super(message);
    }
}

export class PaymentRequired extends Error {
    type = ErrorType.PaymentRequired;
    constructor(message: string) {
        super(message);
    }
}

export class InternalError extends Error {
    type = ErrorType.InternalError;
    constructor(message: string) {
        super(message);
    }
}

export function errorStatusCode(ex: any): httpCodes.StatusCodes {
    /*
    This is a helper function which derives the HTTP Status Code from the type of error that is thrown.
    We use this because only the controller layer in our REST API knows of the existence of HTTP.
     */
    let statusCode: httpCodes.StatusCodes;
    switch (ex.type) {
        case ErrorType.NotFound:
            statusCode = httpCodes.StatusCodes.NOT_FOUND;
            break;
        case ErrorType.BadRequest:
            statusCode = httpCodes.StatusCodes.BAD_REQUEST;
            break;
        case ErrorType.Unauthorized:
            statusCode = httpCodes.StatusCodes.UNAUTHORIZED;
            break;
        case ErrorType.PaymentRequired:
            statusCode = httpCodes.StatusCodes.PAYMENT_REQUIRED;
            break;
        default:
            statusCode = httpCodes.StatusCodes.INTERNAL_SERVER_ERROR;
            break;
    }
    return statusCode;
}

export function handleControllerLevelError(res: Response, req: Request, err:any, errorMessage: string) {
    const statusCode = errorStatusCode(err);
    const issues = err.issues ?? err.errors
    console.log(issues)

    console.error(err.message);
    console.error(err.stack);
    // @ts-ignore
    console.error('Body: ', req.body)
    console.error('Params: ', req.params)
    console.error('Query: ', req.query)
    const tempResult: ResultWithValue<any> = {
        isSuccess: false,
        value: issues,
        httpStatus: statusCode,
        errorMessage: process.env.NODE_ENV === 'DEV' ? errorMessage : '',
    };
    return res.status(tempResult.httpStatus).send(tempResult);
}

import { AxiosError } from "axios";

export function isAxiosError<T>(error: Error | AxiosError<T>): error is AxiosError<T> {
    return "isAxiosError" in error && error.isAxiosError;
}

export function handleAxiosError(stackString: string, error: AxiosError){
    console.error(stackString);
    console.error({
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        headers: error.config?.headers,
        params: error.config?.params,
        message: error.message,
        response: {
            status: error.response?.status,
            data: error.response?.data,

        },
        stack: error.stack,
    });
}