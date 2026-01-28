import { ApolloError } from '@apollo/client';

import { DataError, MatchList, NoDataText, SectionContainer } from '../../../../components';
import { T_FETCH_MATCHES } from '../../types';
import { mapMatchesToMatchesList } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES;
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
      <MatchList matches={mapMatchesToMatchesList(data?.matches)} loading={loading} />
    );

  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
