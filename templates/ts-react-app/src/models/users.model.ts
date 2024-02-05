import { z } from 'zod';

const GeoSchema = z.object({
    lat: z.string(),
    lng: z.string(),
});

const AddressSchema = z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: GeoSchema,
});

const CompanySchema = z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
});

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    address: AddressSchema,
    phone: z.string(),
    website: z.string(),
    company: CompanySchema,
});

export type UserSchemaVM = z.TypeOf<typeof UserSchema>;

