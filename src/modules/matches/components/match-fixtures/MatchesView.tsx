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
  const renderContent = () => {
    const hasNoMatches = seasonReady && data?.matches && data.matches.length === 0;

    if (hasNoMatches) {
      return <NoDataText>No matches yet</NoDataText>;
    }

    return <MatchList matches={mapMatchesToMatchesList(data?.matches)} loading={loading} />;
  };

  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
