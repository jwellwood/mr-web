import { getPercentage } from '../../../../../utils';
import { T_FETCH_PLAYER_STATS } from '../../../types';

export const rows = (data?: T_FETCH_PLAYER_STATS['player']) => {
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
      value: gamesWithGoal,
      average: getPercentage(gamesWithGoal || 0, apps || 0, 1),
    },
    {
      label: 'Assist in',
      value: gamesWithAssist,
      average: getPercentage(gamesWithAssist || 0, apps || 0, 1),
    },
    {
      label: 'Goal and Assist in',
      value: gamesWithGoalAndAssist,
      average: getPercentage(gamesWithGoalAndAssist || 0, apps || 0, 1),
    },
    {
      label: 'Goal or Assist in',
      value: gamesWithGoalOrAssist,
      average: getPercentage(gamesWithGoalOrAssist || 0, apps || 0, 1),
    },
  ];
};
