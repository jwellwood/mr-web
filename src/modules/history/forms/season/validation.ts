import { z } from 'zod';
import zodDate from '../../../../utils/dev/zodDate';

export const SeasonSchema = z.object({
  yearStarted: zodDate(),
  yearEnded: zodDate(),
  leaguePosition: z.number().int().optional(),
  totalFinalPositions: z.number().int().optional(),
  division: z.string().optional(),
  comment: z.string().optional(),
});

export type SeasonFormData = z.infer<typeof SeasonSchema>;
