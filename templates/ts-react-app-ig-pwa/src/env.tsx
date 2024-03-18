import { createRoot } from 'react-dom/client';
import { ZodFormattedError, z } from 'zod';
import InvalidEnv from './pages/Fallbacks/Status/InvalidEnv/InvalidEnv';

export const clientSchema = z.object({
    REACT_APP_BASE_API_URL: z.string().nonempty(),
    REACT_APP_APP_BASE_URL: z.string().nonempty(),
    REACT_APP_APP_NAME: z.string().nonempty(),
    REACT_APP_DEPLOYMENT_ENV: z.enum(['development', 'staging', 'production']),
    REACT_APP_REDIRECT_SUCCESS: z.string().nonempty(),
    REACT_APP_REDIRECT_FAILURE: z.string().nonempty(),
    REACT_APP_REDIRECT_CANCEL: z.string().nonempty(),
    REACT_APP_SENTRY_DSN: z.string().nonempty(),
    REACT_APP_SENTRY_AUTH_TOKEN: z.string().nonempty(),
    REACT_APP_FIREBASE_API_KEY: z.string().nonempty(),
    REACT_APP_FIREBASE_AUTH_DOMAIN: z.string().nonempty(),
    REACT_APP_FIREBASE_PROJECT_ID: z.string().nonempty(),
    REACT_APP_FIREBASE_STORAGE_BUCKET: z.string().nonempty(),
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: z.string().nonempty(),
    REACT_APP_FIREBASE_APP_ID: z.string().nonempty(),
});

const _clientEnv = clientSchema.safeParse(process.env);

export const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
    Object.entries(errors)
        .map(([name, value]) => {
            if (value && '_errors' in value) return `${name}: ${value._errors.join(', ')}\n`;
        })
        .filter(Boolean);

if (!_clientEnv.success) {
    console.error(
        '❌ Invalid environment variables:\n',
        ...formatErrors(_clientEnv.error.format()),
    );

    // Check if the root element exists before rendering the ErrorComponent
    const rootElement = document.getElementById('root');
    if (rootElement) {
        createRoot(rootElement).render(<InvalidEnv message={formatErrors(_clientEnv.error.format())} />);
    } else {
        console.error('❌ Root element with id "root" not found.');
    }

    throw new Error('Invalid environment variables');
}

export const env = _clientEnv.data;
export const envSchema = clientSchema;