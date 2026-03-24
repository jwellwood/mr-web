import type { ResultFormData } from './validation';

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
