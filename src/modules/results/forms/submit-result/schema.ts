import { z } from 'zod';

export const SubmitResultSchema = z.object({
  homeGoals: z.coerce.number().optional(),
  awayGoals: z.coerce.number().optional(),
  isForfeit: z.boolean(),
});

export type SubmitResultFormInput = z.input<typeof SubmitResultSchema>;
export type SubmitResultFormData = z.output<typeof SubmitResultSchema>;

export const submitResultInitialFormState = {
  homeGoals: 0,
  awayGoals: 0,
  isForfeit: false,
};
