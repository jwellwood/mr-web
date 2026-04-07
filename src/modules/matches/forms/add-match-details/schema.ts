import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import { zodDate } from '../../../../utils/dev/zodDate';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const AddMatchDetailsSchema = z.object({
  date: zodDate(),
  isHome: z.boolean(),
  isForfeit: z.boolean(),
  opponentId: z.string().min(1, t('VALIDATION.required')),
  competitionId: z.string().min(1, t('VALIDATION.required')),
  seasonId: z.string().min(1, t('VALIDATION.required')),
  teamGoals: z
    .int()
    .min(0, t('VALIDATION.low', { min: 0 }))
    .max(99, t('VALIDATION.high', { max: 99 })),
  opponentGoals: z
    .int()
    .min(0, t('VALIDATION.low', { min: 0 }))
    .max(99, t('VALIDATION.high', { max: 99 })),
});

export type AddMatchDetailsFormValues = z.infer<typeof AddMatchDetailsSchema>;

export default AddMatchDetailsSchema;
