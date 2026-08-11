import { z } from 'zod';
import { getRequiredFields } from '../../../../utils';

export const SubmitResultSchema = z.object({
  homeGoals: z.coerce.number().max(99).min(0),
  awayGoals: z.coerce.number().max(99).min(0),
  isForfeit: z.boolean(),
});

export type SubmitResultFormInput = z.input<typeof SubmitResultSchema>;
export type SubmitResultFormData = z.output<typeof SubmitResultSchema>;

export const submitResultRequiredFields = getRequiredFields(SubmitResultSchema);

export const submitResultInitialFormState = {
  homeGoals: 0,
  awayGoals: 0,
  isForfeit: false,
};
