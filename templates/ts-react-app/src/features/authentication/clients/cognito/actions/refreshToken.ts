import {
    CognitoRefreshToken,
    CognitoUser
} from 'amazon-cognito-identity-js';
import { useUserAuthStore } from 'src/store/userAuth/userAuthStore';
import { _getCognitoUser } from './_getCognitoUser';

const asyncRefreshUser = (
    cognitoUser: CognitoUser,
    refreshAccessToken: CognitoRefreshToken
): Promise<any> => {
    return new Promise(function (resolve, reject) {
        cognitoUser.refreshSession(refreshAccessToken, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

export default async function refreshAccessToken() {
    try {
        const cognitoUser = _getCognitoUser(useUserAuthStore.getState().user ?? '')
        const newRefreshToken = new CognitoRefreshToken({
            RefreshToken: useUserAuthStore.getState().refreshToken ?? '',
        });
        const refreshedSession: any = await asyncRefreshUser(
            cognitoUser,
            newRefreshToken
        );
        return {
            refreshToken: refreshedSession.refreshToken.token, // this will be added to the session (done within 'callbacks' object)
            accessToken: refreshedSession.accessToken.jwtToken, // this will be added to the session (done within 'callbacks' object)
        };
    } catch (error) {
        console.log(error)
        throw new Error('Error getting token');
    }
}