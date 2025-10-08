import { ICompetition, IOrganization } from '../../../types';

export const initialOrgDetailsState: Partial<IOrganization> = {
  name: '',
  website: '',
  yearFounded: '',
  city: '',
  country: '',
};

export const initialCompetitionState: Partial<ICompetition> = {
  name: '',
  competitionType: '',
  isActive: true,
};
