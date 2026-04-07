import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCH_OPPONENTS } from '../../graphql';
import { columns, rows } from '../tables/match-opponents';
import MatchOpponentsFilters from './filters/MatchOpponentsFilters';

interface Props {
  data?: T_FETCH_MATCH_OPPONENTS;
  loading: boolean;
  error?: TApolloError;
  seasonReady: boolean;
}

export default function MatchOpponentsView({ data, loading, error, seasonReady }: Props) {
  const { t } = useTranslation('matches');
  const renderContent = () => {
    return seasonReady && data && data.stats.length === 0 ? (
      <NoDataText>{t('MESSAGES.NO_MATCHES')}</NoDataText>
    ) : (
      <CustomTable
        rows={rows(data?.stats)}
        columns={columns(t)}
        isSortable
        sortByString="played"
        loading={loading}
        loadingRowCount={20}
      />
    );
  };

  return (
    <SectionContainer title={<MatchOpponentsFilters />}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
