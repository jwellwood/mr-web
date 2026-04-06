import { z } from 'zod';
import i18n from '../../../../i18n/react-i18n';
import { zodDate } from '../../../../utils/dev/zodDate';

const t = (key: string, options?: Record<string, unknown>) =>
  i18n.t(key, { ns: 'inputs', ...options });

export const PlayerSchema = z.object({
  name: z
    .string()
    .min(2, t('VALIDATION.too_small', { min: 2 }))
    .max(50, t('VALIDATION.too_long', { max: 50 })),
  squadNumber: z.union([z.string(), z.number()]).optional(),
  position: z.string(),
  image: z.any().optional(),
  nationality: z.string(),
  dateOfBirth: zodDate(),
  yearJoined: zodDate(),
  isCaptain: z.boolean(),
  isViceCaptain: z.boolean(),
  isHallOfFame: z.boolean(),
  description: z
    .string()
    .max(200, t('VALIDATION.too_long', { max: 200 }))
    .optional(),
  seasonIds: z.array(z.string()).min(1, t('VALIDATION.too_small', { min: 1 })),
});

export type PlayerFormData = z.infer<typeof PlayerSchema>;

const date = new Date();

export const initialPlayerState: PlayerFormData = {
  name: '',
  yearJoined: date,
  nationality: '',
  position: 'DF',
  squadNumber: '1',
  dateOfBirth: date,
  isCaptain: false,
  isViceCaptain: false,
  isHallOfFame: false,
  seasonIds: [],
};
