import { getAvg, getPercentage } from '../../../../../utils';
import { T_FETCH_MATCH_OPPONENTS } from '../../../graphql';
import { OpponentNameCell } from './OpponentNameCell';

const getPoints = (wins: number, draws: number) => wins * 3 + draws;

const getAvgScore = (total: number, goals: number, conceded: number): number => {
  const avgScored = getAvg(goals, total);
  const avgConceded = getAvg(conceded, total);
  return +(Number(avgScored) - Number(avgConceded)).toFixed(1);
};

export const rows = (data?: T_FETCH_MATCH_OPPONENTS['stats']) =>
  (data ?? []).map(item => ({
    name: item && (
      <OpponentNameCell
        name={item.opponentName}
        badge={item.opponentBadge || ''}
        opponentId={item._id}
      />
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
