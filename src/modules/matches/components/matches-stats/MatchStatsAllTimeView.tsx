import {
  DataError,
  MatchAverages,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCHES_ALL_TIME_STATS } from '../../types';
import { mapMatchesStatsToMatchesAverages, mapMatchesStatsToMatchesTable } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES_ALL_TIME_STATS;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchStatsAllTimeView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data?.stats && !data?.stats?.total ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={mapMatchesStatsToMatchesTable(data?.stats)} loading={loading} />
        <MatchAverages stats={mapMatchesStatsToMatchesAverages(data?.stats)} loading={loading} />
      </>
    );
  };

  return (
    <SectionContainer title="All Time">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
