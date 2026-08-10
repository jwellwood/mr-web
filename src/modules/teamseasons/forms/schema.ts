import { z } from 'zod';
import { getRequiredFields } from '../../../utils';
import zodDate from '../../../utils/dev/zodDate';

export const SeasonSchema = z.object({
  yearStarted: zodDate(),
  yearEnded: zodDate(),
  leaguePosition: z.coerce.number().int().optional(),
  totalFinalPositions: z.coerce.number().int().optional(),
  division: z.string().optional(),
  comment: z.string().optional(),
  orgSeasonId: z.string().optional(),
});

export type SeasonFormInput = z.input<typeof SeasonSchema>;
export type SeasonFormData = z.output<typeof SeasonSchema>;

export const requiredFields = getRequiredFields(SeasonSchema);

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
