import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer, NoDataText } from '../../../components';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { ISquadSeasonStats } from '../types';
import SeasonStatsTable from '../components/season-stats-table/SeasonStatsTable';

interface Props {
  error?: ApolloError;
  loading: boolean;
  seasonEndDate?: string;
  data?: { stats: ISquadSeasonStats[] };
  seasonReady: boolean;
}

export default function SquadStatsSeasonView({
  error,
  loading,
  data,
  seasonEndDate,
  seasonReady,
}: Props) {
  const renderContent = () => {
    return (seasonReady && !data && !loading) || (!loading && data?.stats.length === 0) ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <>
        <PlayersByNumbers players={data?.stats} loading={loading} season={seasonEndDate} showAge />
        <SeasonStatsTable data={data} loading={loading} />
      </>
    );
  };
  return (
    <SectionContainer title="Season Stats">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
