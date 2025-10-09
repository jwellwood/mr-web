import { ICompetitionInput, IOrganizationInput } from '../types';

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
