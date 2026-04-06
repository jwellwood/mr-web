import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYER_MATCH_RECORDS } from '../../graphql';
import { columns, rows } from '../tables/player-match-records';

interface Props {
  data?: T_FETCH_PLAYER_MATCH_RECORDS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerMatchesWithRecordsView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const renderContent = () => {
    if (data && !data?.stats) {
      return <NoDataText>{t('MESSAGES.NO_MATCHES_WITH_GOALS')}</NoDataText>;
    }
    return (
      <CustomTable
        columns={columns}
        rows={rows(t, data?.stats)}
        isSortable={false}
        loading={loading}
        loadingRowCount={3}
      />
    );
  };

  return (
    <SectionContainer title={t('SECTIONS.RECORDS')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
