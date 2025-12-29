import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { getShortDate } from '../../../../../utils/helpers';
import { StreakTypes } from '../../../types';

export const rows = (streaks?: StreakTypes, loading?: boolean) => {
  const getRowData = (streakType: keyof StreakTypes, currentStreak: keyof StreakTypes) => {
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
      label: 'Contributions',
      ...getRowData('contributionStreak', 'currentContributionStreak'),
    },
  ];
};
