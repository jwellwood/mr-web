import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import { getRequiredFields } from '../../../../utils';
import { zodDate } from '../../../../utils/dev/zodDate';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const EditProfileSchema = z.object({
  username: z
    .string()
    .min(2, { message: t('VALIDATION.too_small', { min: 2 }) })
    .max(20, { message: t('VALIDATION.too_long', { max: 20 }) }),
  email: z.email(t('VALIDATION.email.invalid')).min(1, { message: t('VALIDATION.email.required') }),
  dateOfBirth: zodDate(true),
  nationality: z.string().optional(),
});

export const requiredFields = getRequiredFields(EditProfileSchema);

export type EditProfileFormData = z.infer<typeof EditProfileSchema>;
