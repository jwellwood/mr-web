import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer } from '../../../components';
import { StreakTypes } from '../types';
import PlayerStreaksTable from '../components/player-streaks-table/PlayerStreaksTable';

interface Props {
  data?: { streaks: StreakTypes };
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerGameStreaksView({ data, loading, error }: Props) {
  return (
    <SectionContainer title="Streaks">
      {error ? <DataError error={error} /> : <PlayerStreaksTable data={data} loading={loading} />}
    </SectionContainer>
  );
}
