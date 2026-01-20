import { ApolloError } from '@apollo/client';

import {
  DataError,
  MatchAverages,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../components';
import { IMatchStats } from '../types';

interface Props {
  data?: { stats: IMatchStats };
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
        <MatchStatsTable stats={data?.stats} loading={loading} />
        <MatchAverages stats={data?.stats} loading={loading} />
      </>
    );
  };

  return (
    <SectionContainer title="Current Season">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
