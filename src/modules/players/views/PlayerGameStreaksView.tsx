import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import { StreakTypes } from '../types';
import PlayerStreaksTable from '../components/player-streaks-table/PlayerStreaksTable';

interface Props {
  data?: { streaks: StreakTypes };
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerGameStreaksView({ data, loading, error }: Props) {
  const renderContent = () => {
    if (data?.streaks && !data.streaks.playedStreak.length) {
      return <NoDataText>No matches played yet</NoDataText>;
    }
    return <PlayerStreaksTable data={data} loading={loading} />;
  };
  return (
    <SectionContainer title="Streaks">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
