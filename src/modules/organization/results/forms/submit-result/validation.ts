import { z } from 'zod';

export const SubmitResultSchema = z.object({
  homeGoals: z.union([z.string(), z.number()]).optional(),
  awayGoals: z.union([z.string(), z.number()]).optional(),
  isForfeit: z.boolean(),
});

export type SubmitResultFormData = z.infer<typeof SubmitResultSchema>;
