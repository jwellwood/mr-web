import type { EditTeamFormData } from './types';
import { EDIT_TEAM_MUTATION_INPUT, FETCH_TEAM_QUERY } from '../../types';

export const mapFormDataToMutationInput = (
  data: EditTeamFormData
): EDIT_TEAM_MUTATION_INPUT['updateTeamDetails'] => {
  return {
    teamName: data.teamName,
    yearFounded: data.yearFounded ? data.yearFounded.toISOString() : null,
    location: data.location ?? null,
    country: data.country ?? null,
    stadiumName: data.stadiumName ?? null,
    stadiumLocation: data.stadiumLocation ?? null,
    stadiumCapacity: data.stadiumCapacity ?? null,
    stadiumSurface: data.stadiumSurface ?? null,
    homeShirt: data.homeShirt ?? null,
    homeShorts: data.homeShorts ?? null,
    homeSocks: data.homeSocks ?? null,
    awayShirt: data.awayShirt ?? null,
    awayShorts: data.awayShorts ?? null,
    awaySocks: data.awaySocks ?? null,
    kitsBackground: data.kitsBackground ?? null,
    isActive: data.isActive,
  };
};

export const mapTeamDataToFormData = (team: FETCH_TEAM_QUERY['team']): EditTeamFormData => {
  return {
    teamName: team.teamName,
    yearFounded: team.yearFounded ? new Date(team.yearFounded) : new Date(),
    location: team.location ?? null,
    country: team.country ?? undefined,
    stadiumName: team.stadiumName ?? undefined,
    stadiumLocation: team.stadiumLocation ?? undefined,
    stadiumCapacity: team.stadiumCapacity ?? undefined,
    stadiumSurface: team.stadiumSurface ?? undefined,
    homeShirt: team.homeShirt ?? '#ffffff',
    homeShorts: team.homeShorts ?? '#ffffff',
    homeSocks: team.homeSocks ?? '#ffffff',
    awayShirt: team.awayShirt ?? '#000000',
    awayShorts: team.awayShorts ?? '#000000',
    awaySocks: team.awaySocks ?? '#000000',
    kitsBackground: team.kitsBackground ?? '#808080',
    isActive: team.isActive,
  };
};
