import { z } from 'zod';

const PostSchema = z.object({
    userId: z.number(),
    id: z.string(),
    title: z.string(),
    body: z.string(),
});

export type PostSchemaVM = z.TypeOf<typeof PostSchema>;

