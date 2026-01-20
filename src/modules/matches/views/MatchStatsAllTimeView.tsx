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
}

export default function MatchStatsAllTimeView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data?.stats && !data?.stats?.total ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={data?.stats} loading={loading} />
        <MatchAverages stats={data?.stats} loading={loading} />
      </>
    );
  };

  return (
    <SectionContainer title="All Time">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
