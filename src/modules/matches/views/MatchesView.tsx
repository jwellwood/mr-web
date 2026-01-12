import { ApolloError } from '@apollo/client';

import { DataError, MatchList, NoDataText, SectionContainer } from '../../../components';
import { IMatchList } from '../types.ts';

interface Props {
  data?: { matches: IMatchList[] };
  loading: boolean;
  error?: ApolloError;
  seasonReady: boolean;
}

export default function MatchesView({ data, loading, error, seasonReady }: Props) {
  const renderContent = () =>
    (seasonReady && !loading && !data) ||
    (seasonReady && data?.matches && data?.matches.length === 0) ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <MatchList matches={data?.matches} loading={loading} />
    );

  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
