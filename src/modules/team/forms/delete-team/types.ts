import { z } from 'zod';
import { DELETE_TEAM_MUTATION_INPUT } from '../../types';

export const DeleteTeamSchema = z.object({
  teamName: z.string().min(1, 'Team name is required'),
});

export type DeleteTeamFormData = z.infer<typeof DeleteTeamSchema>;

export type DeleteTeamMutationInput = DELETE_TEAM_MUTATION_INPUT;
