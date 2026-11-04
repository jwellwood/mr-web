import { z } from 'zod';
import type { T_EDIT_TEAM_BADGE_VARIABLES } from '../../graphql';

export const EditTeamBadgeSchema = z.object({
  imageFile: z.any().optional(),
});

export type EditTeamBadgeFormData = z.infer<typeof EditTeamBadgeSchema>;

// Shape expected by the generated mutation (excluding teamId provided from route)
export type EditTeamBadgeMutationInput = Omit<T_EDIT_TEAM_BADGE_VARIABLES, 'teamId'>;
