import { Auth0Client } from '../auth0-client';
import axios, {  isAxiosError } from 'axios';
import { env } from '../../env';
import { handleAxiosError } from '../../utils/errors';


export class HttpAuth0Client implements Auth0Client {
    private async getManagementToken(): Promise<{ access_token: string, expires_in: number, token_type: string }> {
        /*
            Gets the JWT token for communication with the Auth0 API
         */
        try {
            const options = {
                method: 'POST',
                url: env.AUTH0_ISSUER_BASE_URL + 'oauth/token',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: env.AUTH0_M2M_CLIENT_ID,
                    client_secret: env.AUTH0_M2M_CLIENT_SECRET,
                    audience: env.AUTH0_ISSUER_BASE_URL + 'api/v2/',
                }),
            };

            const res = await axios.request(options);
            return res.data;
        } catch (err: any) {
            if (isAxiosError(err)) {
                handleAxiosError('HttpAuth0Client - getManagementToken Error', err)
                throw Error('HttpAuth0Client - getManagementToken Error');
            } else {
                throw Error(err.message);
            }
        }
    }

    public async assignAdminRoleToUser(userId: string): Promise<void> {
        /*
            Assigns an admin role to the user on Auth0
         */
        const tokenResponse = await this.getManagementToken();
        const token = tokenResponse['access_token'];

        const options = {
            method: 'POST',
            url: env.AUTH0_ISSUER_BASE_URL + `api/v2/users/${userId}/roles`,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + token,
                'cache-control': 'no-cache',
            },
            data: { roles: [env.AUTH0_ADMIN_ROLE_ID] },
        };

        try {
            await axios.request(options);

        } catch (err: any) {
            if (isAxiosError(err)) {
                handleAxiosError('HttpAuth0Client - getManagementToken Error', err)
                throw Error('HttpAuth0Client - getManagementToken Error')
            } else {
                throw Error(err.message);
            }
        }

    }

    public async revokeUserAdminRights(userId: string): Promise<void> {
        /*
            Revokes a User's Admin role on Auth0
         */
        const tokenResponse = await this.getManagementToken();
        const token = tokenResponse['access_token'];

        const options = {
            method: 'DELETE',
            url: env.AUTH0_ISSUER_BASE_URL + `api/v2/users/${userId}/roles`,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + token,
                'cache-control': 'no-cache',
            },
            data: { roles: [env.AUTH0_ADMIN_ROLE_ID] },
        };

        try {
            await axios.request(options);
        } catch (err: any) {
            if (isAxiosError(err)) {
                handleAxiosError('HttpAuth0Client - getManagementToken Error', err)
                throw Error('HttpAuth0Client - getManagementToken Error')
            } else {
                throw Error(err.message);
            }
        }
    }

    public async requestPasswordResetEmail(email: string): Promise<void> {
        /*
            Revokes a User's Admin role on Auth0
         */
        console.info('Requesting email in client')
        const tokenResponse = await this.getManagementToken();
        const token = tokenResponse['access_token'];

        const options = {
            method: 'POST',
            url: env.AUTH0_ISSUER_BASE_URL + `dbconnections/change_password`,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + token,
                'cache-control': 'no-cache',
            },
            data: { email, connection: 'Username-Password-Authentication' },
        };

        try {
            await axios.request(options);
        } catch (err: any) {
            if (isAxiosError(err)) {
                handleAxiosError('HttpAuth0Client - requestPasswordResetEmail Error', err)
                throw Error('HttpAuth0Client - requestPasswordResetEmail Error')
            } else {
                throw Error(err.message);
            }
        }
    }

    public async toggleMFA(userId: string, mfaEnabled: boolean): Promise<void>{
        /*
           Toggles MFA for a user
        */
        console.info('Updating MFA status on Auth0')
        const tokenResponse = await this.getManagementToken();
        const token = tokenResponse['access_token'];

        const options = {
            method: 'PATCH',
            url: env.AUTH0_ISSUER_BASE_URL + `api/v2/users/${userId}`,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + token,
                'cache-control': 'no-cache',
            },
            data: { 'user_metadata': {use_mfa: mfaEnabled} },
        };

        try {
            await axios.request(options);
        } catch (err: any) {
            if (isAxiosError(err)) {
                handleAxiosError('HttpAuth0Client - toggleMFA Error', err)
                throw Error('HttpAuth0Client - toggleMFA Error')
            } else {
                throw Error(err.message);
            }
        }
    }
}