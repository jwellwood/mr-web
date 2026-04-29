import { z } from 'zod';
import zodDate from '../../../utils/dev/zodDate';

export const SeasonSchema = z.object({
  yearStarted: zodDate(),
  yearEnded: zodDate(),
  leaguePosition: z.number().int().optional(),
  totalFinalPositions: z.number().int().optional(),
  division: z.string().optional(),
  comment: z.string().optional(),
  orgSeasonId: z.string().optional(),
});

export type SeasonFormData = z.infer<typeof SeasonSchema>;

const currentYear = new Date();

export const initialTeamSeasonState: SeasonFormData = {
  yearStarted: currentYear,
  yearEnded: new Date(currentYear.getFullYear() + 1, 0, 1),
  leaguePosition: 0,
  totalFinalPositions: 0,
  division: '',
  comment: '',
  orgSeasonId: '',
};
