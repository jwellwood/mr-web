import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, { message: t('VALIDATION.too_small', { min: 6 }) }),
    confirmPassword: z.string().min(6, t('VALIDATION.password.confirm')),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: t('VALIDATION.password.no_match'),
  });

export type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export const resetPasswordFormState: ResetPasswordFormData = {
  password: '',
  confirmPassword: '',
};
