import { z } from 'zod';

export const DeleteAccountSchema = z.object({
  username: z.string().min(1, 'Username is required'),
});

export type DeleteAccountFormData = z.infer<typeof DeleteAccountSchema>;
