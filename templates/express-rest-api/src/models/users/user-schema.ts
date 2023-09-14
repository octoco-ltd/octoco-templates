import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const UserRolesEnum = z.enum(['ADMIN', 'USER'])

export const UserTypeEnum = z.enum(['FREE', 'PAID'])

export const UserSchema = z.object({
    id: z.string().nonempty(),
    createdAt: z.date(),
    name: z.string(),
    email: z.string().optional(),
    emailVerified: z.boolean().default(false),
    cellphone: z.string().optional(),

});

export const UpdateUserMetadataSchema = z.object({
    name: z.string().optional(),
    cellphone: z.string().optional(),
    email: z.string().optional(),
    emailVerified: z.boolean().optional(),
});

export const UserKYCDetailsSchema = z.object({kycStatus: z.string().optional(),
    kycId: z.string().optional(),
    kycSubmitted: z.boolean().default(false),})

export const UserAccountBalanceSchema = z.object({
    balance: z.number()
})

export const UserInsertModelSchema = UserSchema.omit({ id: true });

export const UserVMSwagger = zodToJsonSchema(UserSchema, 'UserVM');
export const UserKYCDetailsVMSwagger = zodToJsonSchema(UserKYCDetailsSchema, 'UserKYCDetailsVM');
export const UserIMSwagger = zodToJsonSchema(UserInsertModelSchema, 'UserIM');


export type UserVM = z.TypeOf<typeof UserSchema>;
export type UserIM = z.infer<typeof UserInsertModelSchema>;
export type UserAccountBalanceVM = z.infer<typeof UserAccountBalanceSchema>
export type UpdateUserMetadataIM = z.infer<typeof UpdateUserMetadataSchema>
export type UserKYCDetailsVM = z.infer<typeof UserKYCDetailsSchema>

export const UpdateUserMetadataIMSwagger = zodToJsonSchema(UpdateUserMetadataSchema, 'UpdateUserMetadataIM');
export const UserAccountBalanceSwagger = zodToJsonSchema(UserAccountBalanceSchema, 'UserAccountBalanceVM')


