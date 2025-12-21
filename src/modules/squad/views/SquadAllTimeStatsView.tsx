import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer, NoDataText } from '../../../components';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { ISquadSeasonStats } from '../types';
import { AllPlayerStreaks } from '../../players/types';
import AllTimeStatsTable from '../components/all-time-stats-table/AllTimeStatsTable';

interface Props {
  error?: ApolloError;
  loading: boolean;
  data?: { stats: ISquadSeasonStats[] };
  streaks?: { streaks: AllPlayerStreaks[] };
}

export default function SquadAllTimeStatsView({ error, loading, data, streaks }: Props) {
  const renderContent = () => {
    return !loading && data?.stats.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <>
        <PlayersByNumbers players={data?.stats || []} loading={loading} showAge={false} />
        <AllTimeStatsTable data={data} streaks={streaks} loading={loading} />
      </>
    );
  };
  return (
    <SectionContainer title="All Time Stats">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
