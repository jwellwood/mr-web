import { z } from 'zod';
import { FORM_ERROR_TEXT } from '../../../../components';

export const ChangePasswordSchema = z
  .object({
    password: z.string().min(1, FORM_ERROR_TEXT.required),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm new password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;
