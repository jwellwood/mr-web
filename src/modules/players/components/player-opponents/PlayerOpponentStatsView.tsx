import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../../components';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../types';
import CustomTable from '../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';

interface Props {
  data?: T_FETCH_PLAYER_OPPONENT_STATS;
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerOpponentStatsView({ data, loading, error }: Props) {
  return (
    <SectionContainer title="Opponent Statistics">
      {error ? (
        <DataError error={error} />
      ) : !loading && !data?.stats[0]?.matches ? (
        <NoDataText>No matches played</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(data, loading)}
          cellIndexStyles={styles}
          isSortable
          sortByString="matches"
        />
      )}
    </SectionContainer>
  );
}
