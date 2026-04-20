import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import { zodDate } from '../../../../utils/dev/zodDate';
import { T_ADD_TEAM_MUTATION_INPUT } from '../../graphql';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const TeamDetailsSchema = z.object({
  teamName: z.string().min(2, t('VALIDATION.too_small', { min: 2 })),
  yearFounded: zodDate(),
  location: z.string().nullable(),
  country: z.string().optional(),
  stadiumName: z.string().optional(),
  stadiumLocation: z.string().optional(),
  stadiumCapacity: z
    .string()
    .max(5, t('VALIDATION.too_long', { max: 5 }))
    .optional(),
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
