import { z } from 'zod';
import i18n from '../../../i18n/react-i18n';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const CompetitionSchema = z.object({
  name: z
    .string()
    .min(1, t('VALIDATION.required'))
    .max(30, t('VALIDATION.too_long', { max: 30 })),
  competitionType: z.string().optional(),
  isActive: z.boolean().optional(),
  matchMinutes: z.union([z.string(), z.number()]).optional(),
  playersPerTeam: z.union([z.string(), z.number()]).optional(),
});

export type CompetitionFormData = z.infer<typeof CompetitionSchema>;

export const initialCompetitionState: CompetitionFormData = {
  name: '',
  competitionType: '',
  isActive: true,
  matchMinutes: 0,
  playersPerTeam: 0,
};
