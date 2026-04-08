import { z } from 'zod';
import i18n from '../../../i18n/react-i18n';

export const AwardSchema = z.object({
  awardName: z
    .string()
    .min(1, i18n.t('awards:VALIDATION.NAME_REQUIRED'))
    .max(50, i18n.t('awards:VALIDATION.NAME_MAX')),
  winners: z.array(z.string()),
  awardValue: z.union([z.string(), z.number()]).optional(),
  comment: z.string().optional(),
});

export type AwardFormData = z.infer<typeof AwardSchema>;

export const initialAwardState: AwardFormData = {
  awardName: '',
  winners: [],
  comment: '',
};
