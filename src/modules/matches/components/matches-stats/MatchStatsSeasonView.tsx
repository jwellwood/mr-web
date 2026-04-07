import { useTranslation } from 'react-i18next';
import {
  DataError,
  MatchAverages,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCHES_STATS } from '../../graphql';
import { mapMatchesStatsToMatchesAverages, mapMatchesStatsToMatchesTable } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES_STATS;
  loading: boolean;
  error?: TApolloError;
  seasonReady: boolean;
}

export default function MatchStatsSeasonView({ data, loading, error, seasonReady }: Props) {
  const { t } = useTranslation('matches');
  const renderContent = () => {
    return (seasonReady && !loading && !data) ||
      (seasonReady && data?.stats && !data?.stats?.total) ? (
      <NoDataText>{t('MESSAGES.NO_MATCHES')}</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={mapMatchesStatsToMatchesTable(data?.stats)} loading={loading} />
        <MatchAverages stats={mapMatchesStatsToMatchesAverages(data?.stats)} loading={loading} />
      </>
    );
  };

  return (
    <SectionContainer title={t('SECTIONS.CURRENT_SEASON')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
