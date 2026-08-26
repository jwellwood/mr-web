import { TFunction } from 'i18next';
import { TTiebreaker } from '../../seasons/constants';

export const getTiebreakerString = (t: TFunction, tiebreaker?: string | null) => {
  if (tiebreaker === TTiebreaker.HEAD_TO_HEAD) {
    return t('CONFIG.HEAD_TO_HEAD');
  }
  if (tiebreaker === TTiebreaker.PENALTIES) {
    return t('CONFIG.PENALTIES');
  }
  return t('CONFIG.GOAL_DIFFERENCE'); // default to goal difference if not specified
};
