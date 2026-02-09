import { lazy } from 'react';
import { OpponentModal } from '../../../../../components';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { getAvg, getPercentage } from '../../../../../utils/helpers';
import { T_FETCH_MATCH_OPPONENTS } from '../../../types';

export const rows = (loading: boolean, data?: T_FETCH_MATCH_OPPONENTS['stats']) => {
  const HeadToHead = lazy(() => import('../../../containers/HeadToHead'));
  const arr = new Array(15).fill({});
  const mappedData = loading || !data?.length ? arr : data;
  const getPoints = (wins: number, draws: number) => {
    return wins * 3 + draws;
  };

  const getAvgScore = (total: number, goals: number, conceded: number): number => {
    const avgScored = getAvg(goals, total);
    const avgConceded = getAvg(conceded, total);
    return +(Number(avgScored) - Number(avgConceded)).toFixed(1);
  };

  return mappedData.map(item => ({
    name: {
      value: (
        <OpponentModal name={item.opponentName} badge={item.opponentBadge} loading={loading}>
          <HeadToHead opponentId={item._id} />
        </OpponentModal>
      ),
    },
    played: loading ? <StatSkeleton /> : item?.total,
    wins: loading ? <StatSkeleton /> : item?.wins,
    draws: loading ? <StatSkeleton /> : item?.draws,
    defeats: loading ? <StatSkeleton /> : item?.losses,
    goalsFor: loading ? <StatSkeleton /> : item?.totalGoalsScored,
    goalsAgainst: loading ? <StatSkeleton /> : item?.totalGoalsConceded,
    difference: loading ? <StatSkeleton /> : item?.totalGoalDifference,
    points: loading ? <StatSkeleton /> : getPoints(item?.wins, item?.draws),
    winPercentage: loading ? <StatSkeleton /> : getPercentage(item?.wins, item?.total, 1),
    avgScore: loading ? (
      <StatSkeleton />
    ) : (
      getAvgScore(item?.total, item?.totalGoalsScored, item?.totalGoalsConceded)
    ),
  }));
};
