import { z } from 'zod';
import { zodDate } from '../../../../utils/zodDate';

export const TrophySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  seasonId: z.string().min(1, 'Season is required'),
  year: zodDate(),
  isWinner: z.boolean(),
  isFinal: z.boolean(),
  opponent: z.string().optional(),
  comment: z.string().optional(),
});

export type TrophyFormData = z.infer<typeof TrophySchema>;
