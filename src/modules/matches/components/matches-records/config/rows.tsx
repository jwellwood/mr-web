import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { getShortDate } from '../../../../../utils';
import { T_FETCH_MATCHES_STREAK } from '../../../types';

export const rows = (streaks?: T_FETCH_MATCHES_STREAK['streaks'], loading?: boolean) => {
  const getRowData = (streakType: keyof T_FETCH_MATCHES_STREAK['streaks']) => {
    const longest = streaks ? streaks[streakType]?.length || 0 : 0;
    const start = streaks ? getShortDate(streaks[streakType]?.startDate) : '';
    const end = streaks ? getShortDate(streaks[streakType]?.endDate) : '';
    return {
      longest: loading ? <StatSkeleton /> : longest,
      start: loading ? <CustomSkeleton width="50px" /> : start,
      end: loading ? <CustomSkeleton width="50px" /> : end,
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
