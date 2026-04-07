import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const SetAdminAccessCodeSchema = z.object({
  accessCode: z
    .string()
    .min(6, t('VALIDATION.min_length', { min: 6 }))
    .max(30, t('VALIDATION.too_long', { max: 30 })),
});

export type SetAdminAccessCodeData = z.infer<typeof SetAdminAccessCodeSchema>;
