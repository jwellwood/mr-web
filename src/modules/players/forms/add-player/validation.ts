import { z } from 'zod';
import { zodDate } from '../../../../utils/zodDate';

export const PlayerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  squadNumber: z.union([z.string(), z.number()]).optional(),
  position: z.string(),
  image: z.any().optional(),
  nationality: z.string(),
  dateOfBirth: zodDate(),
  yearJoined: zodDate(),
  isCaptain: z.boolean(),
  isViceCaptain: z.boolean(),
  isHallOfFame: z.boolean(),
  description: z.string().max(200, 'Description must be at most 200 characters').optional(),
  seasonIds: z.array(z.string()).min(1, 'Select at least one season'),
});

export type PlayerFormData = z.infer<typeof PlayerSchema>;
