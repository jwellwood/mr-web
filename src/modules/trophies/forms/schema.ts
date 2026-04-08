import { z } from 'zod';
import i18n from '../../../i18n/react-i18n';
import { zodDate } from '../../../utils/dev/zodDate';

export const TrophySchema = z.object({
  name: z.string().min(1, i18n.t('trophies:VALIDATION.NAME_REQUIRED')),
  seasonId: z.string().min(1, i18n.t('trophies:VALIDATION.SEASON_REQUIRED')),
  year: zodDate(),
  isWinner: z.boolean(),
  isFinal: z.boolean(),
  opponent: z.string().optional(),
  comment: z.string().optional(),
});

export type TrophyFormData = z.infer<typeof TrophySchema>;

export const initialTrophyFormState: TrophyFormData = {
  name: '',
  seasonId: '',
  year: new Date(),
  isFinal: false,
  isWinner: true,
  opponent: '',
  comment: '',
};
