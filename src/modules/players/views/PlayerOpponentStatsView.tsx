import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer } from '../../../components';
import { IPlayerVsStats } from '../../matches/types';
import PlayerOpponentTable from '../components/player-opponents-table/PlayerOpponentTable';

type Props = {
  data?: { stats: IPlayerVsStats[] };
  loading: boolean;
  error?: ApolloError;
};

export default function PlayerOpponentStatsView({ data, loading, error }: Props) {
  return (
    <SectionContainer>
      {error ? (
        <DataError error={error} />
      ) : (
        <PlayerOpponentTable data={data?.stats} loading={loading} />
      )}
    </SectionContainer>
  );
}
