import { z } from 'zod';

export const SetAdminAccessCodeSchema = z.object({
  accessCode: z.string().min(6, 'Access code must be at least 6 characters'),
});

export type SetAdminAccessCodeData = z.infer<typeof SetAdminAccessCodeSchema>;
