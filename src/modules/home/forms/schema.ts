import { z } from 'zod';
import i18n from '../../../i18n/react-i18n';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const SearchFormSchema = z.object({
  teamName: z.string().min(2, { message: t('VALIDATION.too_small', { min: 2 }) }),
});

export type SearchFormData = z.infer<typeof SearchFormSchema>;
