import { z } from 'zod';
import i18n from '../../../i18n/react-i18n';
import { getRequiredFields } from '../../../utils';
import zodDate from '../../../utils/dev/zodDate';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const OrgSeasonSchema = z.object({
  yearStarted: zodDate(),
  yearEnded: zodDate(),
  isCurrent: z.boolean().optional(),
  comment: z.string().optional(),
  teamIds: z.array(z.string()).min(1, t('VALIDATION.required')),
  competitionIds: z.array(z.string()).min(1, t('VALIDATION.required')),
});

export const requiredFields = getRequiredFields(OrgSeasonSchema);

export type OrgSeasonFormData = z.infer<typeof OrgSeasonSchema>;

export const initialOrgSeasonState: OrgSeasonFormData = {
  yearStarted: new Date(),
  yearEnded: new Date(),
  isCurrent: false,
  comment: '',
  teamIds: [],
  competitionIds: [],
};
