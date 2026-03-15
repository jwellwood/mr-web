import { z } from 'zod';

export const CompetitionSchema = z.object({
  name: z.string().min(1, 'Competition name is required'),
  competitionType: z.string().optional(),
  isActive: z.boolean().optional(),
  matchMinutes: z.union([z.string(), z.number()]).optional(),
  playersPerTeam: z.union([z.string(), z.number()]).optional(),
});

export type CompetitionFormData = z.infer<typeof CompetitionSchema>;
