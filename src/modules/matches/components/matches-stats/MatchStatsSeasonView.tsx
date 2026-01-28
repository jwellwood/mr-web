import { ApolloError } from '@apollo/client';

import {
  DataError,
  MatchAverages,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../../components';
import { T_FETCH_MATCHES_STATS } from '../../types';
import { mapMatchesStatsToMatchesAverages, mapMatchesStatsToMatchesTable } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES_STATS;
  loading: boolean;
  error?: ApolloError;
  seasonReady: boolean;
}

export default function MatchStatsSeasonView({ data, loading, error, seasonReady }: Props) {
  const renderContent = () => {
    return (seasonReady && !loading && !data) ||
      (seasonReady && data?.stats && !data?.stats?.total) ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={mapMatchesStatsToMatchesTable(data?.stats)} loading={loading} />
        <MatchAverages stats={mapMatchesStatsToMatchesAverages(data?.stats)} loading={loading} />
      </>
    );
  };

  return (
    <SectionContainer title="Current Season">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
