import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from 'components/loaders';
import CustomTable from 'components/tables/CustomTable';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { IPlayerVsStats } from 'types';
import { player_vs_stats, player_vs_styles } from '../configs';
import { GET_PLAYER_VS_STATS } from '../graphql/queries/getPlayerVsStats';
import { mapPlayerVsStats } from '../helpers/mapPlayerVsStats';

const PlayerVsStats: React.FC = () => {
  const { playerId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_PLAYER_VS_STATS, {
    variables: { playerId },
  });

  if (error) {
    return <ErrorGraphql error={[error]} />;
  }

  const { stats } = data || {};

  const tableData = mapPlayerVsStats(stats as IPlayerVsStats[], loading);

  return !loading ? (
    <CustomTable
      columns={player_vs_stats}
      rows={tableData}
      cellIndexStyles={player_vs_styles}
      isSortable
      sortByString="matches"
    />
  ) : (
    <Spinner />
  );
};

export default PlayerVsStats;
