import { z } from 'zod';
import { FORM_ERROR_TEXT } from '../../../../components';

export const ForgotPasswordSchema = z.object({
  email: z.email(FORM_ERROR_TEXT.email),
});

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
