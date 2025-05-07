import { ISelectOptions } from 'components/inputs/SelectInput';
import { ITeamRoles } from 'types';
import { ITeamDetailsInput } from './types';

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

export const initialRoleState: Partial<ITeamRoles> = {
  name: '',
  role: '',
  contact: '',
};

export enum PAGES {
  TEAM = 'Team',
  ADD_TEAM = 'Add Team',
  EDIT_TEAM = 'Edit Team',
  EDIT_BADGE = 'Edit Team Badge',
  EDIT_ROLES = 'Add Team Role',
  TROPHIES_ADMIN_PAGE = 'Trophies Admin',
  DELETE_TEAM = 'Delete Team',
}

export enum TeamSuccess {
  add = 'Team added',
  edit = 'Team updated',
  delete = 'Team deleted',
}

export enum TeamError {
  add = 'Something went wrong. Try again',
  edit = 'Something went wrong. Try again',
  delete = 'Something went wrong. Try again',
}

export const surfaceOptions: ISelectOptions[] = [
  { value: '', label: '' },
  { value: 'Grass', label: 'Grass' },
  { value: 'Artificial Grass', label: 'Artificial Grass' },
  { value: 'Astroturf', label: 'Astroturf' },
  { value: 'Concrete', label: 'Concrete' },
  { value: 'Acrylic', label: 'Acrylic' },
  { value: 'Sand', label: 'Sand' },
  { value: 'Other', label: 'Other' },
];
