import type { SeasonFormData } from './validation';

const currentYear = new Date();

export const initialTeamSeasonState: SeasonFormData = {
  yearStarted: currentYear,
  yearEnded: new Date(currentYear.getFullYear() + 1, 0, 1),
  leaguePosition: 0,
  totalFinalPositions: 0,
  division: '',
  comment: '',
};
