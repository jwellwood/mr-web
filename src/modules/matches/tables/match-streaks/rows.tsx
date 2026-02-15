import { getShortDate } from '../../../../utils';
import { T_FETCH_MATCHES_STREAK } from '../../types';

export const rows = (streaks?: T_FETCH_MATCHES_STREAK['streaks']) => {
  const getRowData = (streakType: keyof T_FETCH_MATCHES_STREAK['streaks']) => {
    const longest = streaks ? streaks[streakType]?.length || 0 : 0;
    const start = streaks ? getShortDate(streaks[streakType]?.startDate) : '';
    const end = streaks ? getShortDate(streaks[streakType]?.endDate) : '';
    return {
      longest,
      start,
      end,
    };
  };

  return [
    {
      label: 'Wins',
      ...getRowData('longestWinStreak'),
    },
    {
      label: 'Unbeaten',
      ...getRowData('longestUnbeatenStreak'),
    },
    {
      label: 'Loss',
      ...getRowData('longestLossStreak'),
    },
    {
      label: 'Winless',
      ...getRowData('longestWinlessStreak'),
    },
  ];
};
