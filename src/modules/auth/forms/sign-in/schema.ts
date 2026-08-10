import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import { getRequiredFields } from '../../../../utils';

const t = (key: string) => i18n.t(key, { ns: 'inputs' });

export const SignInSchema = z.object({
  email: z.email(t('VALIDATION.email.invalid')).min(1, t('VALIDATION.required')),
  password: z.string().min(1, t('VALIDATION.required')),
});

export const requiredFields = getRequiredFields(SignInSchema);

export type SignInFormData = z.infer<typeof SignInSchema>;

export const signInFormState: SignInFormData = {
  email: '',
  password: '',
};
