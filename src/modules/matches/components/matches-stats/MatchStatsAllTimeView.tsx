import { useTranslation } from 'react-i18next';
import {
  DataError,
  MatchAverages,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCHES_ALL_TIME_STATS } from '../../graphql';
import { mapMatchesStatsToMatchesAverages, mapMatchesStatsToMatchesTable } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES_ALL_TIME_STATS;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchStatsAllTimeView({ data, loading, error }: Props) {
  const { t } = useTranslation('matches');
  const renderContent = () => {
    return data?.stats && !data?.stats?.total ? (
      <NoDataText>{t('NO_DATA.MATCHES')}</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={mapMatchesStatsToMatchesTable(data?.stats)} loading={loading} />
        <MatchAverages stats={mapMatchesStatsToMatchesAverages(data?.stats)} loading={loading} />
      </>
    );
  };

  return (
    <SectionContainer title={t('SECTIONS.ALL_TIME')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
