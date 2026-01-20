import { z } from 'zod';
import { zodDate } from '../../../../utils/zodDate';

export const TeamDetailsSchema = z.object({
  teamName: z.string().min(2, 'Team name is required'),
  yearFounded: zodDate(),
  location: z.string().optional(),
  country: z.string().optional(),
  stadiumName: z.string().optional(),
  stadiumLocation: z.string().optional(),
  stadiumCapacity: z.string().max(5, 'Maximum length is 5').optional(),
  stadiumSurface: z.string().optional(),
  homeShirt: z.string().optional(),
  homeShorts: z.string().optional(),
  homeSocks: z.string().optional(),
  awayShirt: z.string().optional(),
  awayShorts: z.string().optional(),
  awaySocks: z.string().optional(),
  kitsBackground: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type TeamFormData = z.infer<typeof TeamDetailsSchema>;
