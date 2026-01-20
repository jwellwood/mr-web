import { z } from 'zod';
import zodDate from '../../../../utils/zodDate';

export const ResultSchema = z.object({
  date: zodDate(),
  gameWeek: z.union([z.string(), z.number()]).optional(),
  competitionId: z.string().optional(),
  orgSeasonId: z.string().optional(),
  homeTeam: z.string().optional(),
  awayTeam: z.string().optional(),
  homeGoals: z.union([z.string(), z.number()]).optional(),
  awayGoals: z.union([z.string(), z.number()]).optional(),
});

export type ResultFormData = z.infer<typeof ResultSchema>;
