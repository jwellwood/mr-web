import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import { IPlayerVsStats } from '../../matches/types';
import PlayerOpponentTable from '../components/player-opponents-table/PlayerOpponentTable';

type Props = {
  data?: { stats: IPlayerVsStats[] };
  loading: boolean;
  error?: ApolloError;
};

export default function PlayerOpponentStatsView({ data, loading, error }: Props) {
  return (
    <SectionContainer title="Opponent Statistics">
      {error ? (
        <DataError error={error} />
      ) : !loading && !data?.stats[0]?.matches ? (
        <NoDataText>No matches played</NoDataText>
      ) : (
        <PlayerOpponentTable data={data?.stats} loading={loading} />
      )}
    </SectionContainer>
  );
}
