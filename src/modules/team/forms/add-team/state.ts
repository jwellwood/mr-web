import type { TeamFormData } from './validation';

export const initialTeamDetailsState: TeamFormData = {
  teamName: '',
  yearFounded: new Date(),
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
