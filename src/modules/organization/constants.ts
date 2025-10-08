import { LINK_TYPE } from '../../app/constants';
import { ISelectOptions } from '../../components/inputs/SelectInput';
import { IListItem } from '../../types';
import { ORG } from '../../router/paths.ts';

export const PAGES = {
  ORG: 'Organization',
  ADD: 'Add New Organization',
  ADD_COMPETITION: 'Add Competition',
  EDIT: 'Edit Organization',
  EDIT_BADGE: 'Edit Organization Badge',
  COMP: 'Competition',
  EDIT_COMP: 'Edit Competition',
} as const;

export const competitionOptions: ISelectOptions[] = [
  { label: 'Friendly', value: 'Friendly' },
  { label: 'League', value: 'League' },
  { label: 'Cup', value: 'Cup' },
  { label: 'Tournament', value: 'Tournament' },
  { label: 'Other', value: 'Other' },
];

export const ORG_ADMIN_LINKS: IListItem[] = [
  { label: 'Add New Team', type: LINK_TYPE.ADD, link: ORG.ADD_TEAM },
  {
    label: 'Add Competition',
    type: LINK_TYPE.ADD,
    link: ORG.ADD_COMPETITION,
  },
  { label: 'Edit Organization', type: LINK_TYPE.EDIT, link: ORG.EDIT },
  { label: 'Edit Org Badge', type: LINK_TYPE.EDIT, link: ORG.EDIT_BADGE },
];

export const COMP_ADMIN_LINKS = [
  { label: 'Add New Winner', type: LINK_TYPE.ADD, link: ORG.ADD_TEAM },
  {
    label: 'Edit Competition',
    type: LINK_TYPE.EDIT,
    link: ORG.EDIT_COMPETITION,
  },
  { label: 'Delete Competition', type: LINK_TYPE.DELETE, link: ORG.EDIT_COMPETITION },
];
