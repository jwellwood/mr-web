import { z } from 'zod';
import { TeamDetailsSchema } from '../add-team/types';

export const EditTeamSchema = TeamDetailsSchema;

export type EditTeamFormData = z.infer<typeof EditTeamSchema>;
