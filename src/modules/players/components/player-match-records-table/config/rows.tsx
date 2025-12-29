import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { IMostGoalsAndAssistsByPlayer } from '../../../../matches/types';
import PlayerMatchesWithMostAssists from '../../../containers/PlayerMatchesWithMostAssists';
import PlayerMatchesWithMostGoals from '../../../containers/PlayerMatchesWithMostGoals';

export const rows = (stats?: IMostGoalsAndAssistsByPlayer, loading?: boolean) => {
  const { maxGoals, maxAssists } = stats || { maxGoals: 0, maxAssists: 0 };
  return [
    {
      label: 'Most Goals in Match',
      value: loading ? <StatSkeleton /> : maxGoals,
      more: loading ? (
        <CustomSkeleton width="50px" />
      ) : (
        { value: maxGoals ? <PlayerMatchesWithMostGoals /> : '' }
      ),
    },
    {
      label: 'Most Assists in Match',
      value: loading ? <StatSkeleton /> : maxAssists,
      more: loading ? (
        <CustomSkeleton width="50px" />
      ) : (
        { value: maxAssists ? <PlayerMatchesWithMostAssists /> : '' }
      ),
    },
  ];
};
