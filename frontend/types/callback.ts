import { z } from 'zod';
import { CallbackScheme } from '../schemes/callback.schema';

export type Callback = z.infer<typeof CallbackScheme>;