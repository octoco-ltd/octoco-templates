import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';


export const ExampleSchema = z.object({
    id: z.string().nonempty(),
    createdAt: z.date(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().default(false),
    cellphone: z.string().optional(),

});



export const ExampleIMSchema = ExampleSchema.omit({ id: true });

export const ExampleVMSwagger = zodToJsonSchema(ExampleSchema, 'ExampleVM');
export const ExampleIMSwagger = zodToJsonSchema(ExampleIMSchema, 'ExampleIM');


export type ExampleVM = z.TypeOf<typeof ExampleSchema>;
export type ExampleIM = z.infer<typeof ExampleIMSchema>;



