import { z } from 'zod';
import { TeamDetailsSchema } from '../add-team/validation';

export const EditTeamSchema = TeamDetailsSchema;

export type EditTeamFormData = z.infer<typeof EditTeamSchema>;
