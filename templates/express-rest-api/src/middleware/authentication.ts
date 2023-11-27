import { auth,  } from 'express-oauth2-jwt-bearer';
import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = auth({
    audience: 'AUTH0_AUDIENCE',
    issuerBaseURL: 'AUTH0_ISSUER_BASE_URL',
    tokenSigningAlg: 'RS256',
});

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const permissions = req.auth?.payload?.permissions;
    if (permissions && Array.isArray(permissions) && permissions.includes('admin')){
        return next()
    } else if (permissions === 'admin'){
        return next()
    }
    return res.status(401).send({
        isSuccess: false,
        value: null,
        httpStatus: 401,
        errorMessage: 'Unauthorized',
    });
}
