import { ApolloError } from '@apollo/client';

import {
  DataError,
  MatchAverages,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../components/index.ts';
import { IMatchStats } from '../types.ts';

interface Props {
  data?: { stats: IMatchStats };
  loading: boolean;
  error?: ApolloError;
}

export default function MatchStatsAllTimeView({ data, loading, error }: Props) {
  const renderContent = () => {
    return (
      <SectionContainer title="All time">
        {data?.stats && !data?.stats?.total ? (
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
