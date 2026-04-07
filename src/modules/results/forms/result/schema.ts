import { z } from 'zod';
import { zodDate } from '../../../../utils';

export const ResultSchema = z.object({
  date: zodDate(),
  kickoffTime: z.string().optional().nullable(),
  gameWeek: z.union([z.string().min(1), z.number().min(1)]),
  competitionId: z.string().min(1, 'Competition is required'),
  orgSeasonId: z.string().min(1, 'Season is required'),
  homeTeam: z.string().min(1, 'Home team is required'),
  awayTeam: z.string().min(1, 'Away team is required'),
  homeGoals: z.union([z.string(), z.number()]).optional(),
  awayGoals: z.union([z.string(), z.number()]).optional(),
  isForfeit: z.boolean(),
  isComplete: z.boolean(),
});

export type ResultFormData = z.infer<typeof ResultSchema>;

export const initialResultState: ResultFormData = {
  date: new Date(),
  kickoffTime: '10:00',
  gameWeek: 0,
  competitionId: '',
  orgSeasonId: '',
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0,
  isForfeit: false,
  isComplete: false,
};
