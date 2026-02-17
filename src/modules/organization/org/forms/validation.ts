import { z } from 'zod';
import zodDate from '../../../../utils/dev/zodDate';

export const OrganizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  website: z.string().optional(),
  yearFounded: zodDate(),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
});

export type OrganizationFormData = z.infer<typeof OrganizationSchema>;
