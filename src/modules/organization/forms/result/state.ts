import type { ResultFormData } from './validation';

export const initialResultState: ResultFormData = {
  date: new Date(),
  gameWeek: 0,
  competitionId: '',
  orgSeasonId: '',
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0,
};
