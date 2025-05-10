import { ISelectOptions } from '../../components/inputs/SelectInput';
import {ICompetition, IOrganization} from "../../types";

export const PAGES = {
  ORG: 'Organization',
  ADD: 'Add New Organization',
  ADD_COMPETITION: 'Add Competition',
  EDIT: 'Edit Organization',
  EDIT_BADGE: 'Edit Organization Badge',
  COMP: 'Competition',
  EDIT_COMP: 'Edit Competition',
} as const;

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

export const competitionOptions: ISelectOptions[] = [
  { label: 'Friendly', value: 'Friendly' },
  { label: 'League', value: 'League' },
  { label: 'Cup', value: 'Cup' },
  { label: 'Tournament', value: 'Tournament' },
  { label: 'Other', value: 'Other' },
];