import { z } from 'zod';

export const UpdateCompConfigSchema = z.object({
  rounds: z.number().optional(),
  splitIndexes: z.array(z.number()).optional(),
  relegationPositions: z.array(z.number()).optional(),
  promotionPositions: z.array(z.number()).optional(),
  priority: z.number().optional(),
});

export type UpdateCompConfigFormData = z.infer<typeof UpdateCompConfigSchema>;
