import { z } from 'zod';
import { TTiebreaker } from '../../constants';

export const UpdateCompConfigSchema = z.object({
  rounds: z.number().optional(),
  splitIndexes: z.array(z.number()).optional(),
  relegationPositions: z.array(z.number()).optional(),
  promotionPositions: z.array(z.number()).optional(),
  priority: z.number().optional(),
  tiebreaker: z.enum([TTiebreaker.HEAD_TO_HEAD, TTiebreaker.GOAL_DIFFERENCE]),
});

export type UpdateCompConfigFormData = z.infer<typeof UpdateCompConfigSchema>;
