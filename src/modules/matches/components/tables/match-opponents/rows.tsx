import { lazy } from 'react';
import { OpponentModal } from '../../../../../components';
import { getAvg, getPercentage } from '../../../../../utils';
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
    name: (
      <OpponentModal name={item.opponentName} badge={item.opponentBadge} loading={loading}>
        <HeadToHead opponentId={item._id} />
      </OpponentModal>
    ),
    played: item?.total,
    wins: item?.wins,
    draws: item?.draws,
    defeats: item?.losses,
    goalsFor: item?.totalGoalsScored,
    goalsAgainst: item?.totalGoalsConceded,
    difference: item?.totalGoalDifference,
    points: getPoints(item?.wins, item?.draws),
    winPercentage: getPercentage(item?.wins, item?.total, 1),
    avgScore: getAvgScore(item?.total, item?.totalGoalsScored, item?.totalGoalsConceded),
  }));
};
