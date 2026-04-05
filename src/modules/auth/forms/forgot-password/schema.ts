import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';

const t = (key: string) => i18n.t(key, { ns: 'inputs' });

export const ForgotPasswordSchema = z.object({
  email: z.email().min(1, { message: t('VALIDATION.required') }),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export const forgotPasswordFormState: ForgotPasswordFormData = {
  email: '',
};
