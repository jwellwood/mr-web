import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import { IPastPlayer } from '../types';
import PlayersByNumbers from '../components/PlayersByNumbers';
import PastPlayersTable from '../components/past-players-table/PastPlayersTable';

type Props = {
  error?: ApolloError;
  data?: { players: IPastPlayer[] };
  loading: boolean;
};

export default function PastPlayersView({ error, data, loading }: Props) {
  const renderData =
    data?.players.length === 0 ? (
      <NoDataText>No past players yet</NoDataText>
    ) : (
      <>
        <PlayersByNumbers players={data?.players} showAge={false} loading={loading} />
        <PastPlayersTable data={data} loading={loading} />
      </>
    );

  return <SectionContainer>{error ? <DataError error={error} /> : renderData}</SectionContainer>;
}
