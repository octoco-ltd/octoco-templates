import { Auth0ProviderOptions } from '@auth0/auth0-react';
import { env } from 'src/env';


export const auth0Config: Auth0ProviderOptions = {
    domain: env.REACT_APP_AUTH0_DOMAIN,
    clientId: env.REACT_APP_AUTH0_CLIENTID,
    // https://stackoverflow.com/questions/63537913/auth0-does-not-persist-login-on-page-refresh-for-email-password
    // useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
        // eslint-disable-next-line camelcase
        redirect_uri: env.REACT_APP_AUTH0_REDIRECT_URI,
        audience: env.REACT_APP_AUTH0_AUDIENCE,
        // https://stackoverflow.com/questions/71288896/how-to-login-once-across-multiple-subdomains-on-a-custom-domain-using-auth0
        cookieDomain: env.REACT_APP_AUTH0_COOKIE_DOMAIN,
    },
};
