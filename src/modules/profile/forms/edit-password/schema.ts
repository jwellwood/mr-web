import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const ChangePasswordSchema = z
  .object({
    password: z.string(),
    newPassword: z.string().min(6, t('VALIDATION.password.new', { min: 6 })),
    confirmPassword: z.string().min(6, t('VALIDATION.password.confirm', { min: 6 })),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: t('VALIDATION.password.no_match'),
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

export const changePasswordFormState: ChangePasswordFormData = {
  password: '',
  newPassword: '',
  confirmPassword: '',
};
