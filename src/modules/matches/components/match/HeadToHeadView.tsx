import { useTranslation } from 'react-i18next';
import {
  DataError,
  MatchList,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCHES_BY_OPPONENT } from '../../graphql';
import { mapHeadToHeadMatchesList, mapHeadToHeadMatchesTable } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES_BY_OPPONENT;
  loading: boolean;
  error?: TApolloError;
}

export default function HeadToHeadView({ data, loading, error }: Props) {
  const { t } = useTranslation('matches');
  const renderContent = () => {
    return data?.matches && data.matches.length === 0 ? (
      <NoDataText>{t('NO_DATA.MATCHES')}</NoDataText>
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
