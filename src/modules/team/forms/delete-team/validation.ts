import { z } from 'zod';

export const DeleteTeamSchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
});

export type DeleteTeamFormData = z.infer<typeof DeleteTeamSchema>;
