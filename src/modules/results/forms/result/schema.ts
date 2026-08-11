import { z } from 'zod';
import { getRequiredFields, zodDate } from '../../../../utils';

export const ResultSchema = z
  .object({
    date: zodDate(),
    kickoffTime: z.string().optional().nullable(),
    gameWeek: z.union([z.string().min(1), z.number().min(1)]),
    competitionId: z.string().min(1, 'Competition is required'),
    orgSeasonId: z.string().min(1, 'Season is required'),
    homeTeam: z.string().min(1, 'Home team is required'),
    awayTeam: z.string(),
    homeGoals: z.union([z.string(), z.number()]).optional(),
    awayGoals: z.union([z.string(), z.number()]).optional(),
    decision: z.string().optional().nullable(),
    winnerSide: z.string().optional().nullable(),
    isForfeit: z.boolean(),
    isComplete: z.boolean(),
    isBye: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isBye && !data.awayTeam) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Away team is required',
        path: ['awayTeam'],
      });
    }
  });

export const requiredFields = getRequiredFields(ResultSchema);

export type ResultFormData = z.infer<typeof ResultSchema>;

export const initialResultState: ResultFormData = {
  date: new Date(),
  kickoffTime: '09:00',
  gameWeek: '',
  competitionId: '',
  orgSeasonId: '',
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0,
  isForfeit: false,
  isComplete: false,
  isBye: false,
};
