import * as httpCodes from "http-status-codes";

export interface Result {
    isSuccess: boolean;
    httpStatus: httpCodes.StatusCodes;
    errorMessage: string;
}

export interface ResultWithValue<T> extends Result {
    value: T;
}
