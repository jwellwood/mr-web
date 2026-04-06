import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer, NoDataText } from '../../../../../components';
import { CustomTable } from '../../../../../components/tables';
import { TApolloError } from '../../../../../types/apollo';
import { T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../../graphql';
import { columns, rows } from '../../tables/squad-single-season-records';

interface Props {
  loading: boolean;
  error?: TApolloError;
  data?: T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY;
}

export default function SquadSingleSeasonRecordsView({ data, loading, error }: Props) {
  const { t } = useTranslation('squad');

  const renderContent = () => (
    <SectionContainer title={t('SECTION_TITLES.SINGLE_SEASON_RECORDS')}>
      {data && !data.stats?.combined?.value ? (
        <NoDataText>{t('NO_DATA.RECORDS')}</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(t, data)}
          isSortable={false}
          loading={loading}
          loadingRowCount={3}
        />
      )}
    </SectionContainer>
  );

  return error ? <DataError error={error} /> : renderContent();
}
