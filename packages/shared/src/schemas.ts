import { Schema, z } from 'zod';

export const zSchema = z.object({
   type: z.literal('a'),
   variable: z.number(),
});

export const isSchema = (value: unknown): value is Schema => zSchema.safeParse(value).success;
