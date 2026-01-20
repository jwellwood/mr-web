import type { ISelectOptions } from '../../components';
import { LINK_TYPE } from '../../constants';

export const TEAM_ADMIN_LINKS = [
  {
    label: 'Add Match',
    type: LINK_TYPE.ADD,
    link: 'add_match',
  },
  { label: 'Add New Season', type: LINK_TYPE.ADD, link: `add_season` },
  {
    label: 'Add Player',
    type: LINK_TYPE.ADD,
    link: `add_player`,
  },
  {
    label: 'Add Trophy',
    type: LINK_TYPE.ADD,
    link: `add_trophy`,
  },
  { label: 'Edit Team', type: LINK_TYPE.EDIT, link: `edit` },
  {
    label: 'Edit Badge',
    type: LINK_TYPE.EDIT,
    link: `edit_badge`,
  },
];

export const PAGES = {
  TEAM: 'Team',
  ADD_TEAM: 'Add Team',
  EDIT_TEAM: 'Edit Team',
  EDIT_BADGE: 'Edit Team Badge',
  DELETE_TEAM: 'Delete Team',
} as const;

export const TeamSuccess = {
  add: 'Team added',
  edit: 'Team updated',
  delete: 'Team deleted',
} as const;

export const TeamError = {
  add: 'Something went wrong. Try again',
  edit: 'Something went wrong. Try again',
  delete: 'Something went wrong. Try again',
} as const;

export const surfaceOptions = [
  { value: '', label: '' },
  { value: 'Grass', label: 'Grass' },
  { value: 'Artificial Grass', label: 'Artificial Grass' },
  { value: 'Astroturf', label: 'Astroturf' },
  { value: 'Concrete', label: 'Concrete' },
  { value: 'Acrylic', label: 'Acrylic' },
  { value: 'Sand', label: 'Sand' },
  { value: 'Other', label: 'Other' },
] as const satisfies ISelectOptions[];
