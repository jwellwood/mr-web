import type { TFunction } from 'i18next';
import { getPercentage } from '../../../../../utils';
import { T_FETCH_PLAYER_STATS } from '../../../graphql';

export const rows = (t: TFunction, data?: T_FETCH_PLAYER_STATS['player']) => {
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
      label: t('TABLES.ROWS.GOAL_IN'),
      value: gamesWithGoal,
      average: getPercentage(gamesWithGoal || 0, apps || 0, 1),
    },
    {
      label: t('TABLES.ROWS.ASSIST_IN'),
      value: gamesWithAssist,
      average: getPercentage(gamesWithAssist || 0, apps || 0, 1),
    },
    {
      label: t('TABLES.ROWS.GOAL_AND_ASSIST_IN'),
      value: gamesWithGoalAndAssist,
      average: getPercentage(gamesWithGoalAndAssist || 0, apps || 0, 1),
    },
    {
      label: t('TABLES.ROWS.GOAL_OR_ASSIST_IN'),
      value: gamesWithGoalOrAssist,
      average: getPercentage(gamesWithGoalOrAssist || 0, apps || 0, 1),
    },
  ];
};
