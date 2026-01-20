import { z } from 'zod';

export const EditTeamBadgeSchema = z.object({
  imageFile: z.any().optional(),
});

export type EditTeamBadgeFormData = z.infer<typeof EditTeamBadgeSchema>;
