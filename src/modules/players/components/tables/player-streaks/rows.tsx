import type { TFunction } from 'i18next';
import { getShortDate } from '../../../../../utils';
import { T_FETCH_PLAYER_STREAKS } from '../../../graphql';

export const rows = (t: TFunction, streaks?: T_FETCH_PLAYER_STREAKS['streaks']) => {
  const getRowData = (
    streakType: keyof T_FETCH_PLAYER_STREAKS['streaks'],
    currentStreak: keyof T_FETCH_PLAYER_STREAKS['streaks']
  ) => {
    const current = streaks ? streaks[currentStreak]?.length || 0 : 0;
    const longest = streaks ? streaks[streakType]?.length || 0 : 0;
    const start = streaks ? getShortDate(streaks[streakType]?.startDate) : '';
    const end = streaks ? getShortDate(streaks[streakType]?.endDate) : '';
    return {
      current: current,
      longest: longest,
      start: start,
      end: end,
    };
  };

  return [
    {
      label: t('TABLES.ROWS.PLAYED'),
      ...getRowData('playedStreak', 'currentPlayedStreak'),
    },
    {
      label: t('TABLES.ROWS.GOALS'),
      ...getRowData('goalStreak', 'currentGoalStreak'),
    },
    {
      label: t('TABLES.ROWS.ASSISTS'),
      ...getRowData('assistStreak', 'currentAssistStreak'),
    },
    {
      label: t('TABLES.ROWS.COMBINED'),
      ...getRowData('contributionStreak', 'currentContributionStreak'),
    },
  ];
};
