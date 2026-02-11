import { StatSkeleton, CustomSkeleton } from '../../../../../../components/loaders';
import { getShortDate } from '../../../../../../utils';
import { T_FETCH_PLAYER_STREAKS } from '../../../../types';

export const rows = (streaks?: T_FETCH_PLAYER_STREAKS['streaks'], loading?: boolean) => {
  const getRowData = (
    streakType: keyof T_FETCH_PLAYER_STREAKS['streaks'],
    currentStreak: keyof T_FETCH_PLAYER_STREAKS['streaks']
  ) => {
    const current = streaks ? streaks[currentStreak]?.length || 0 : 0;
    const longest = streaks ? streaks[streakType]?.length || 0 : 0;
    const start = streaks ? getShortDate(streaks[streakType]?.startDate) : '';
    const end = streaks ? getShortDate(streaks[streakType]?.endDate) : '';
    return {
      current: loading ? <StatSkeleton /> : current,
      longest: loading ? <StatSkeleton /> : longest,
      start: loading ? <CustomSkeleton width="50px" /> : start,
      end: loading ? <CustomSkeleton width="50px" /> : end,
    };
  };

  return [
    {
      label: 'Played',
      ...getRowData('playedStreak', 'currentPlayedStreak'),
    },
    {
      label: 'Goals',
      ...getRowData('goalStreak', 'currentGoalStreak'),
    },
    {
      label: 'Assists',
      ...getRowData('assistStreak', 'currentAssistStreak'),
    },
    {
      label: 'Combined',
      ...getRowData('contributionStreak', 'currentContributionStreak'),
    },
  ];
};
