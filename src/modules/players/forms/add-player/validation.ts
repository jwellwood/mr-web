import { z } from 'zod';
import { zodDate } from '../../../../utils/zodDate';

export const PlayerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  squadNumber: z.union([z.string(), z.number()]).optional(),
  position: z.string().optional(),
  image: z.any().optional(),
  nationality: z.string().optional(),
  dateOfBirth: zodDate(true),
  yearJoined: zodDate(true),
  isCaptain: z.boolean().optional(),
  isViceCaptain: z.boolean().optional(),
  isHallOfFame: z.boolean().optional(),
  description: z.string().max(200, 'Description must be at most 200 characters').optional(),
  seasonIds: z.array(z.string()).min(1, 'Select at least one season'),
});

export type PlayerFormData = z.infer<typeof PlayerSchema>;
