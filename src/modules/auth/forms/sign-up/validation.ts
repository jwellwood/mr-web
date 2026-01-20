import { z } from 'zod';

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be at most 20 characters'),
  email: z.email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  acceptTerms: z
    .boolean()
    .refine(val => val === true, { message: 'You must accept the terms of use' }),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;
