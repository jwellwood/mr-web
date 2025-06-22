import { ITeamSeasonInput } from '../types';

const currentYear = new Date().getFullYear();

export const initialTeamSeasonState: ITeamSeasonInput = {
  yearStarted: currentYear.toString(),
  yearEnded: (+currentYear + 1).toString(),
  leaguePosition: '',
  totalFinalPositions: '',
  division: '',
  comment: '',
};
