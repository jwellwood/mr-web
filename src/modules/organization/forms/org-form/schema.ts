import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import zodDate from '../../../../utils/dev/zodDate';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const OrganizationSchema = z.object({
  name: z.string().min(1, t('VALIDATION.required')),
  website: z.string().optional(),
  yearFounded: zodDate(),
  city: z.string().min(1, t('VALIDATION.required')),
  country: z.string().min(1, t('VALIDATION.required')),
});

export type OrganizationFormData = z.infer<typeof OrganizationSchema>;

export const initialOrgDetailsState: OrganizationFormData = {
  name: '',
  website: '',
  yearFounded: new Date(),
  city: '',
  country: '',
};
