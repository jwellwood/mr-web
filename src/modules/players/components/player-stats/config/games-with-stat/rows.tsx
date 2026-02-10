import StatSkeleton from '../../../../../../components/loaders/StatSkeleton';
import { getPercentage } from '../../../../../../utils';
import { T_FETCH_PLAYER_STATS } from '../../../../types';

export const rows = (data?: T_FETCH_PLAYER_STATS['player'], loading?: boolean) => {
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
          value: getPercentage(gamesWithGoal || 0, apps || 0, 1),
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
          value: getPercentage(gamesWithAssist || 0, apps || 0, 1),
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
          value: getPercentage(gamesWithGoalAndAssist || 0, apps || 0, 1),
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
          value: getPercentage(gamesWithGoalOrAssist || 0, apps || 0, 1),
          isPercentage: true,
        }
      ),
    },
  ];
};
