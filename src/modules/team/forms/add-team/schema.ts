import { z } from 'zod';
import { zodDate } from '../../../../utils/dev/zodDate';
import { T_ADD_TEAM_MUTATION_INPUT } from '../../graphql';

export const TeamDetailsSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  yearFounded: zodDate(),
  location: z.string().nullable(),
  country: z.string().optional(),
  stadiumName: z.string().optional(),
  stadiumLocation: z.string().optional(),
  stadiumCapacity: z.string().max(5, 'Maximum length is 5').optional(),
  stadiumSurface: z.string().optional(),
  homeShirt: z.string().optional(),
  homeShorts: z.string().optional(),
  homeSocks: z.string().optional(),
  awayShirt: z.string().optional(),
  awayShorts: z.string().optional(),
  awaySocks: z.string().optional(),
  kitsBackground: z.string().optional(),
  isActive: z.boolean(),
});

export type TeamFormData = z.infer<typeof TeamDetailsSchema>;

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

export const mapFormDataToMutationInput = (
  data: TeamFormData
): T_ADD_TEAM_MUTATION_INPUT['team'] => {
  return {
    teamName: data.teamName,
    yearFounded: data.yearFounded ? data.yearFounded.toISOString() : null,
    location: data.location ?? null,
    country: data.country ?? null,
    isActive: data.isActive,
  };
};
