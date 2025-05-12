import { ITeamDetailsInput } from './types';
import { ISelectOptions } from '../../components/inputs/SelectInput.tsx';

export const initialTeamDetailsState: ITeamDetailsInput = {
  teamName: '',
  yearFounded: '',
  location: '',
  country: '',
  stadiumName: '',
  stadiumLocation: '',
  stadiumCapacity: '',
  stadiumSurface: '',
  homeShirt: '#ffffff',
  homeShorts: '#ffffff',
  homeSocks: '#ffffff',
  awayShirt: '#000000',
  awayShorts: '#000000',
  awaySocks: '#000000',
  kitsBackground: '#808080',
  isActive: true,
};

export const initialRoleState = {
  name: '',
  role: '',
  contact: '',
} as const;

export const PAGES = {
  TEAM: 'Team',
  ADD_TEAM: 'Add Team',
  EDIT_TEAM: 'Edit Team',
  EDIT_BADGE: 'Edit Team Badge',
  EDIT_ROLES: 'Add Team Role',
  TROPHIES_ADMIN_PAGE: 'Trophies Admin',
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
