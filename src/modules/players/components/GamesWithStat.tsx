import { game_with_stat_styles, player_games_with_stat } from '../configs';
import { IPlayerStats } from '../../../types';
import { getPercentage } from '../../../utils/helpers';
import CustomTable from '../../../components/tables/CustomTable.tsx';

type Props = {
  player: IPlayerStats;
  loading: boolean;
};

function GamesWithStat({ player }: Props) {
  const { apps, gamesWithGoal, gamesWithAssist, gamesWithGoalAndAssist, gamesWithGoalOrAssist } =
    player;

  const rows = [
    {
      label: 'Goal in',
      value: gamesWithGoal || 0,
      average: {
        value: getPercentage(gamesWithGoal, apps, 1),
        isPercentage: true,
      },
    },
    {
      label: 'Assist in',
      value: gamesWithAssist || 0,
      average: {
        value: getPercentage(gamesWithAssist, apps, 1),
        isPercentage: true,
      },
    },
    {
      label: 'Goal and Assist in',
      value: gamesWithGoalAndAssist || 0,
      average: {
        value: getPercentage(gamesWithGoalAndAssist, apps, 1),
        isPercentage: true,
      },
    },
    {
      label: 'Goal or Assist in',
      value: gamesWithGoalOrAssist || 0,
      average: {
        value: getPercentage(gamesWithGoalOrAssist, apps, 1),
        isPercentage: true,
      },
    },
  ];

  return (
    <CustomTable
      columns={player_games_with_stat}
      rows={rows}
      isSortable={false}
      cellIndexStyles={game_with_stat_styles}
    />
  );
}

export default GamesWithStat;
