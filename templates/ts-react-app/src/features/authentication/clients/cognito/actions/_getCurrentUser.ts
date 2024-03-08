import { CognitoUser } from 'amazon-cognito-identity-js';
import { _getCognitoPool } from './_getCognitoPool'

/**
 * Retrieves the current user from the Cognito user pool.
 * @returns The current user object.
 */
export const _getCurrentUser = () => {
    const currentUser = _getCognitoPool().getCurrentUser()
    return currentUser;
}