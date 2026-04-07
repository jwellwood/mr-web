import { z } from 'zod';

export const SubmitResultSchema = z.object({
  homeGoals: z.union([z.string(), z.number()]).optional(),
  awayGoals: z.union([z.string(), z.number()]).optional(),
  isForfeit: z.boolean(),
});

export type SubmitResultFormData = z.infer<typeof SubmitResultSchema>;

export const submitResultInitialFormState = {
  homeGoals: 0,
  awayGoals: 0,
  isForfeit: false,
};
