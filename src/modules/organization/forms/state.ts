import { ICompetitionInput, IOrganizationInput, IOrgSeasonInput, IResultInput } from '../types';

export const initialOrgDetailsState: IOrganizationInput = {
  name: '',
  website: '',
  yearFounded: '',
  city: '',
  country: '',
};

export const initialCompetitionState: ICompetitionInput = {
  name: '',
  competitionType: '',
  isActive: true,
  matchMinutes: 0,
  playersPerTeam: 0,
  numberOfTeams: 0,
};

export const initialOrgSeasonState: IOrgSeasonInput = {
  yearStarted: new Date().getFullYear().toString(),
  yearEnded: new Date().getFullYear().toString(),
  isCurrent: false,
  comment: '',
};

export const initialResultState: IResultInput = {
  date: new Date().toString(),
  gameWeek: 0,
  competitionId: '',
  orgSeasonId: '',
  homeTeam: '',
  awayTeam: '',
  homeGoals: 0,
  awayGoals: 0,
};
