import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import PastPlayersTable from '../components/past-players-table/PastPlayersTable';
import { FETCH_PAST_PLAYERS_QUERY } from '../types';

interface Props {
  error?: ApolloError;
  data?: FETCH_PAST_PLAYERS_QUERY;
  loading: boolean;
}

export default function PastPlayersView({ error, data, loading }: Props) {
  const renderData =
    data?.players.length === 0 ? (
      <NoDataText>No past players yet</NoDataText>
    ) : (
      <PastPlayersTable data={data} loading={loading} />
    );

  return <SectionContainer>{error ? <DataError error={error} /> : renderData}</SectionContainer>;
}
