import { ApolloError } from '@apollo/client';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/CustomTable';
import { FETCH_PAST_PLAYERS_QUERY } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: FETCH_PAST_PLAYERS_QUERY;
  error?: ApolloError;
  loading: boolean;
}

export default function PastPlayersView({ error, data, loading }: Props) {
  const renderData =
    data?.players.length === 0 ? (
      <NoDataText>No past players yet</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(data, loading)}
        isSortable
        sortByString="seasons"
        cellIndexStyles={styles}
      />
    );

  return <SectionContainer>{error ? <DataError error={error} /> : renderData}</SectionContainer>;
}
