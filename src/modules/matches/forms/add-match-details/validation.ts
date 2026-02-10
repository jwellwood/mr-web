import { z } from 'zod';
import { zodDate } from '../../../../utils/dev/zodDate';

export const AddMatchDetailsSchema = z.object({
  date: zodDate(),
  isHome: z.boolean(),
  isForfeit: z.boolean(),
  opponentId: z.string().min(1, 'Opponent is required'),
  competitionId: z.string().min(1, 'Competition is required'),
  seasonId: z.string().min(1, 'Season is required'),
  teamGoals: z.int().min(0, 'must be at least 0').max(99, 'must be at most 99'),
  opponentGoals: z.int().min(0, 'must be at least 0').max(99, 'must be at most 99'),
});

export type AddMatchDetailsFormValues = z.infer<typeof AddMatchDetailsSchema>;

export default AddMatchDetailsSchema;
