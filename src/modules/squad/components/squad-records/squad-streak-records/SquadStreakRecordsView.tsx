import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import CustomTable from '../../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../../types/apollo';
import { T_FETCH_SQUAD_STREAKS_QUERY } from '../../../graphql';
import { columns, rows } from '../../tables/squad-streak-records';

interface Props {
  data?: T_FETCH_SQUAD_STREAKS_QUERY;
  loading: boolean;
  error?: TApolloError;
}

export default function SquadStreakRecordsView({ data, loading, error }: Props) {
  const { t } = useTranslation('squad');

  const renderContent = () => {
    return data && !data.streaks.played.value ? (
      <NoDataText>{t('NO_DATA.RECORDS')}</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(t, data?.streaks)}
        isSortable
        sortByString="played"
        loading={loading}
        loadingRowCount={4}
      />
    );
  };

  return (
    <SectionContainer title={t('SECTION_TITLES.STREAKS')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
