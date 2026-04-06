import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer, NoDataText } from '../../../../../components';
import { CustomTable } from '../../../../../components/tables';
import { TApolloError } from '../../../../../types/apollo';
import { T_FETCH_SQUAD_RECORDS_QUERY } from '../../../graphql';
import { columns, rows } from '../../tables/squad-overall-records';

interface Props {
  data?: T_FETCH_SQUAD_RECORDS_QUERY;
  loading: boolean;
  error?: TApolloError;
}

export default function SquadOverallRecordsView({ data, loading, error }: Props) {
  const { t } = useTranslation('squad');

  const renderContent = () => (
    <SectionContainer title={t('SECTION_TITLES.OVERALL_RECORDS')}>
      {data?.stats && !data.stats.apps?.length ? (
        <NoDataText>{t('NO_DATA.RECORDS')}</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(t, data)}
          isSortable={false}
          loading={loading}
          loadingRowCount={4}
        />
      )}
    </SectionContainer>
  );

  return error ? <DataError error={error} /> : renderContent();
}
