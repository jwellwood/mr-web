import { useQuery } from '@apollo/client';

import { Spinner } from '../../../../components/loaders';
import CustomTable from '../../../../components/tables/CustomTable';
import ErrorGraphql from '../../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { IPlayerVsStats } from '../../../../types';
import { player_vs_stats, player_vs_styles } from '../../configs';
import { FETCH_PLAYER_OPPONENT_STATS } from '../../graphql';
import { mapPlayerVsStats } from '../../helpers/mapPlayerVsStats';

export default function PlayerVsStats() {
  const { playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_OPPONENT_STATS, {
    variables: { playerId },
  });

  const { stats } = data || {};

  const tableData = mapPlayerVsStats(stats as IPlayerVsStats[]);

  const renderContent = () => {
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

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
