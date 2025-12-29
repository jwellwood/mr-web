import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { getPercentage } from '../../../../../utils/helpers';
import { IPlayerStats } from '../../../../matches/types';

export const rows = (data?: IPlayerStats, loading?: boolean) => {
  const { apps, gamesWithGoal, gamesWithAssist, gamesWithGoalAndAssist, gamesWithGoalOrAssist } =
    data || {
      apps: 0,
      gamesWithGoal: 0,
      gamesWithAssist: 0,
      gamesWithGoalAndAssist: 0,
      gamesWithGoalOrAssist: 0,
    };
  return [
    {
      label: 'Goal in',
      value: loading ? <StatSkeleton /> : gamesWithGoal,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value: getPercentage(gamesWithGoal, apps, 1),
          isPercentage: true,
        }
      ),
    },
    {
      label: 'Assist in',
      value: loading ? <StatSkeleton /> : gamesWithAssist,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value: getPercentage(gamesWithAssist, apps, 1),
          isPercentage: true,
        }
      ),
    },
    {
      label: 'Goal and Assist in',
      value: loading ? <StatSkeleton /> : gamesWithGoalAndAssist,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value: getPercentage(gamesWithGoalAndAssist, apps, 1),
          isPercentage: true,
        }
      ),
    },
    {
      label: 'Goal or Assist in',
      value: loading ? <StatSkeleton /> : gamesWithGoalOrAssist || 0,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value: getPercentage(gamesWithGoalOrAssist, apps, 1),
          isPercentage: true,
        }
      ),
    },
  ];
};
