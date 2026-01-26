import { z } from 'zod';
import type { Edit_Team_BadgeMutationVariables } from '../../graphql/EDIT_TEAM_BADGE.generated';

export const EditTeamBadgeSchema = z.object({
  imageFile: z.any().optional(),
});

export type EditTeamBadgeFormData = z.infer<typeof EditTeamBadgeSchema>;

// Shape expected by the generated mutation (excluding teamId provided from route)
export type EditTeamBadgeMutationInput = Omit<Edit_Team_BadgeMutationVariables, 'teamId'>;
