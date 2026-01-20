import type { TrophyFormData } from './validation';

export const initialTrophyFormState: TrophyFormData = {
  name: '',
  seasonId: '',
  year: new Date(),
  isFinal: false,
  isWinner: true,
  opponent: '',
  comment: '',
};
