import { z } from 'zod';
import { zSchema } from './schemas';

export type Schema = z.infer<typeof zSchema>;
