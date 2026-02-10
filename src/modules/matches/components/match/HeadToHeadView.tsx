import {
  DataError,
  MatchList,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCHES_BY_OPPONENT } from '../../types';
import { mapHeadToHeadMatchesList, mapHeadToHeadMatchesTable } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES_BY_OPPONENT;
  loading: boolean;
  error?: TApolloError;
}

export default function HeadToHeadView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data?.matches && data.matches.length === 0 ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={mapHeadToHeadMatchesTable(data?.matches)} loading={loading} />
        <MatchList
          matches={mapHeadToHeadMatchesList(data?.matches)}
          loading={loading}
          showBadge={false}
        />
      </>
    );
  };

  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
