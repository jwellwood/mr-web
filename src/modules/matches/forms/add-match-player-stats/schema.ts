import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import { getRequiredFields } from '../../../../utils';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const AddMatchPlayerStatsSchema = z.object({
  isStarter: z.boolean(),
  matchPosition: z.string(),
  goals: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  pensScored: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  assists: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  ownGoals: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  pensMissed: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  pensSaved: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  conceded: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  yellowCards: z.coerce
    .number()
    .int()
    .min(0, t('VALIDATION.low', { min: 0 })),
  mvp: z.boolean(),
  redCard: z.boolean(),
  cleanSheet: z.boolean(),
});

export const requiredFields = getRequiredFields(AddMatchPlayerStatsSchema);

export type AddMatchPlayerStatsFormInput = z.input<typeof AddMatchPlayerStatsSchema>;
export type AddMatchPlayerStatsFormValues = z.output<typeof AddMatchPlayerStatsSchema>;

export default AddMatchPlayerStatsSchema;
