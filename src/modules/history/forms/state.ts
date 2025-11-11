import { IAward, ITeamSeasonInput, ITrophy } from '../types';

const currentYear = new Date().getFullYear();

export const initialTeamSeasonState: ITeamSeasonInput = {
  yearStarted: currentYear.toString(),
  yearEnded: (+currentYear + 1).toString(),
  leaguePosition: '',
  totalFinalPositions: '',
  division: '',
  comment: '',
};

export const initialTrophyFormState: Partial<ITrophy> = {
  name: '',
  seasonId: '',
  year: '',
  isFinal: false,
  isWinner: true,
  opponent: '',
  comment: '',
};

export const initialAwardState: Partial<IAward> = {
  awardName: '',
  winners: [],
  comment: '',
};
