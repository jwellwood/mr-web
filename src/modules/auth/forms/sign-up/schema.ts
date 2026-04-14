import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const SignUpSchema = () =>
  z.object({
    username: z
      .string()
      .min(2, { message: t('VALIDATION.too_small', { min: 2 }) })
      .max(20, { message: t('VALIDATION.too_long', { max: 20 }) }),
    email: z
      .email(t('VALIDATION.email.invalid'))
      .min(1, { message: t('VALIDATION.email.required') }),
    password: z.string().min(6, { message: t('VALIDATION.too_small', { min: 6 }) }),
    acceptTerms: z.boolean().refine(val => val === true, { message: t('VALIDATION.terms') }),
  });

export type SignUpFormData = z.infer<ReturnType<typeof SignUpSchema>>;

export const signUpFormState: SignUpFormData = {
  username: '',
  email: '',
  password: '',
  acceptTerms: false,
};
