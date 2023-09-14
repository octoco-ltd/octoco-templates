import { Request, Response } from 'express';
import { ResultWithValue } from '../models/result-models/results';
import * as httpCodes from 'http-status-codes';
import { BadRequest, handleControllerLevelError, UnAuthorized } from '../utils/errors';

import { UserService } from '../services/user-service';
import {
    UpdateUserMetadataIM,
    UpdateUserMetadataSchema,
    UserVM,
} from '../models/users/user-schema';
import { captureException } from '@sentry/node';

export class UserController {
    constructor(private userService: UserService) {
    }

    public async getAllUsers(req: Request, res: Response) {
        /*
            Fetches all users from Firestore
             */
        try {
            const users = await this.userService.getAllUsers();
            const tempResult: ResultWithValue<UserVM[]> = {
                isSuccess: true,
                value: users,
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
                `userController - getAllUsers Error: ${err.message}`,
            );
        }
    }

    public async getUserByID(req: Request, res: Response) {
        /*
            Endpoint for adding a user to our DB
             */
        try {
            const uid = req.params.id;
            if (!uid) throw new BadRequest('ID must be defined');
            const user = await this.userService.getUserByID(uid);
            const tempResult: ResultWithValue<UserVM> = {
                isSuccess: true,
                value: user,
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
                `userController - getUserByID Error: ${err.message}`,
            );
        }
    }

    public async updateUserMetadata(req: Request, res: Response) {
        /*
            Endpoint for adding a user to our DB
             */
        try {
            const uid = req.params.id;
            if (!uid) throw new BadRequest('ID must be defined');
            const update: UpdateUserMetadataIM = UpdateUserMetadataSchema.parse(req.body);
            await this.userService.updateUser(uid, update);
            const tempResult: ResultWithValue<null> = {
                isSuccess: true,
                value: null,
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
                `userController - updateUserMetadata Error: ${err.message}`,
            );
        }
    }

    public async updateUserDisabledStatus(req: Request, res: Response) {
        /*
            Change users isDisabled flag
             */
        try {
            const uid = req.params.id;
            if (!uid) throw new BadRequest('ID must be defined');

            const disabledParam = req.query.isDisabled;
            if (disabledParam === undefined) throw new BadRequest('Missing query parameter');

            const isDisabled = disabledParam === 'true'

            if (isDisabled) {
                await this.userService.disableUser(uid);
            } else {
                await this.userService.enableUser(uid);
            }

            const tempResult: ResultWithValue<null> = {
                isSuccess: true,
                value: null,
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
                `userController - updateUserDisabledStatus Error: ${err.message}`,
            );
        }
    }

    public async deleteUser(req: Request, res: Response) {
        /*
            Endpoint for adding a user to our DB
             */
        try {
            const uid = req.params.id;
            if (!uid) throw new BadRequest('ID must be defined');
            await this.userService.deleteUser(uid);
            const tempResult: ResultWithValue<null> = {
                isSuccess: true,
                value: null,
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
                `userController - deleteUser Error: ${err.message}`,
            );
        }
    }

    public async getUserKYCDetails(req: Request, res: Response) {
        /*
            Endpoint for getting a User's KYC details from the DB
             */
        try {
            const uid = req.params.id;
            if (!uid) throw new BadRequest('ID must be defined');
            const kycDetails = await this.userService.getUserKycDetails(uid);
            const tempResult: ResultWithValue<UserKYCDetailsVM> = {
                isSuccess: true,
                value: kycDetails,
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
                `userController - getUserKYCDetails Error: ${err.message}`,
            );
        }
    }

    public async toggleMFA(req: Request, res: Response) {
        /*
            Endpoint for getting a User's KYC details from the DB
             */
        try {
            const uid = req.params.id;
            if (!uid) throw new BadRequest('ID must be defined');
            const mfaParam = req.query.mfaEnabled
            if (mfaParam === undefined) throw new BadRequest('Missing query parameter');

            // @ts-ignore
            if (uid !== req.auth?.payload?.dbUser?.id) throw new UnAuthorized(`${uid} does not match ${req.auth?.payload?.dbUser?.id}`)

            const mfaEnabled = mfaParam === 'true'
            await this.userService.toggleMFA(uid, mfaEnabled);


            const tempResult: ResultWithValue<null> = {
                isSuccess: true,
                value: null,
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
                `userController - toggleMFA Error: ${err.message}`,
            );
        }
    }
    
}
