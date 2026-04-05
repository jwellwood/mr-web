import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import { zodDate } from '../../../../utils/dev/zodDate';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const EditProfileSchema = z.object({
  username: z
    .string()
    .min(2, { message: t('VALIDATION.too_small', { min: 2 }) })
    .max(20, { message: t('VALIDATION.too_long', { max: 20 }) }),
  email: z.email(t('VALIDATION.email_invalid')).min(1, { message: t('VALIDATION.email_required') }),
  dateOfBirth: zodDate(true),
  nationality: z.string().optional(),
});

export type EditProfileFormData = z.infer<typeof EditProfileSchema>;
