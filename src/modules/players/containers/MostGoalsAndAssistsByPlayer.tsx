import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from '../../../components/loaders';
import CustomTable from '../../../components/tables/CustomTable';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { player_most_goals_and_assists } from '../configs';
import { GET_MOST_GOALS_AND_MOST_ASSISTS_BY_PLAYER } from '../graphql';
import PlayerMatchesWithMostAssists from './PlayerMatchesWithMostAssists';
import PlayerMatchesWithMostGoals from './PlayerMatchesWithMostGoals';

const MostGoalsAndAssistsByPlayer: React.FC = () => {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_MOST_GOALS_AND_MOST_ASSISTS_BY_PLAYER, {
    variables: { teamId, playerId },
  });

  const { stats } = data || {};
  const { maxGoals = 0, maxAssists = 0 } = stats && stats[0] ? stats[0] : {};

  const rows = [
    {
      label: 'Most Goals in Match',
      value: maxGoals || 0,
      more: { value: maxGoals ? <PlayerMatchesWithMostGoals /> : '' },
    },
    {
      label: 'Most Assists in Match',
      value: maxAssists || 0,
      more: { value: maxAssists ? <PlayerMatchesWithMostAssists /> : '' },
    },
  ] as const;

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return !loading ? (
    <CustomTable columns={player_most_goals_and_assists} rows={rows} isSortable={false} />
  ) : (
    <Spinner />
  );
};

export default MostGoalsAndAssistsByPlayer;
