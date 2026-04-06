import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const RequestAccessSchema = z.object({
  accessCode: z.string().min(6, t('VALIDATION.too_small', { min: 6 })),
});

export type RequestAccessData = z.infer<typeof RequestAccessSchema>;
