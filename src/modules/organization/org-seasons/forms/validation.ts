import { z } from 'zod';
import zodDate from '../../../../utils/dev/zodDate';

export const OrgSeasonSchema = z.object({
  yearStarted: zodDate(),
  yearEnded: zodDate(),
  isCurrent: z.boolean().optional(),
  comment: z.string().optional(),
});

export type OrgSeasonFormData = z.infer<typeof OrgSeasonSchema>;
