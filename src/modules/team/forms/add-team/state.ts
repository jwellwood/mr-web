import { ADD_TEAM_MUTATION_INPUT } from '../../types';
import type { TeamFormData } from './types';

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

export const mapFormDataToMutationInput = (data: TeamFormData): ADD_TEAM_MUTATION_INPUT['team'] => {
  return {
    teamName: data.teamName,
    yearFounded: data.yearFounded ? data.yearFounded.toISOString() : null,
    location: data.location ?? null,
    country: data.country ?? null,
    isActive: data.isActive,
  };
};
