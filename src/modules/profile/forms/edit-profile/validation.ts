import { z } from 'zod';
import { zodDate } from '../../../../utils/dev/zodDate';

export const EditProfileSchema = z.object({
  username: z.string().min(2, 'Username is required'),
  email: z.email('Invalid email').min(1, 'Email is required'),
  dateOfBirth: zodDate(true),
  nationality: z.string().optional(),
});

export type EditProfileFormData = z.infer<typeof EditProfileSchema>;
