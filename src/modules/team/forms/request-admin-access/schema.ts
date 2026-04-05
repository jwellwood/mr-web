import { z } from 'zod';

export const RequestAccessSchema = z.object({
  accessCode: z.string().min(6, 'Access code must be at least 6 characters'),
});

export type RequestAccessData = z.infer<typeof RequestAccessSchema>;
