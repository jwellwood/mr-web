import { ApolloError } from '@apollo/client';

import {
  DataError,
  MatchAverages,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../components';
import { IMatchStats } from '../types.ts';

interface Props {
  data?: { stats: IMatchStats };
  loading: boolean;
  error?: ApolloError;
  seasonReady: boolean;
}

export default function MatchStatsSeasonView({ data, loading, error, seasonReady }: Props) {
  const renderContent = () => {
    return (
      <SectionContainer title="Current Season">
        {(seasonReady && !data?.stats) || (data?.stats && !data?.stats?.total) ? (
          <NoDataText>No matches yet</NoDataText>
        ) : (
          <>
            <MatchStatsTable stats={data?.stats} loading={loading} />
            <MatchAverages stats={data?.stats} loading={loading} />
          </>
        )}
      </SectionContainer>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
