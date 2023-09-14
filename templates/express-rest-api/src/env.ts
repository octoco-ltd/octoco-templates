import { ZodFormattedError, z } from 'zod';
import { config } from 'dotenv';

if (process.env.NODE_ENV === 'dev') {
    config();
}

export const clientSchema = z.object({
    FIREBASE_ADMIN_CERT: z.string().nonempty(),
    SENTRY_CONNECTION_STRING: z.string().nonempty(),
    NODE_ENV: z.string().nonempty(),
    MONGO_DB_URL: z.string().nonempty()

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
    throw new Error('Invalid environment variables');
}

export const env = _clientEnv.data;
