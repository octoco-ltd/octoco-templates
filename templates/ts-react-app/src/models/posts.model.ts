import { z } from 'zod';

/**
 * Represents the schema for a post.
 */
const PostSchema = z.object({
    userId: z.number(),
    id: z.string(),
    title: z.string(),
    body: z.string(),
});

export type PostSchemaVM = z.TypeOf<typeof PostSchema>;

