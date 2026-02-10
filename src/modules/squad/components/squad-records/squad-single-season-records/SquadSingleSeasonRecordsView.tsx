import { DataError, SectionContainer, NoDataText } from '../../../../../components';
import CustomTable from '../../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../../types/apollo';
import { type FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../../types';
import { columns, rows, styles } from './config';

interface Props {
  loading: boolean;
  error?: TApolloError;
  data?: FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY;
}

export default function SquadSingleSeasonRecordsView({ data, loading, error }: Props) {
  const renderContent = () => (
    <SectionContainer title="Single Season Records">
      {data && !data.stats?.combined?.value ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(data, loading)}
          isSortable={false}
          cellIndexStyles={styles}
        />
      )}
    </SectionContainer>
  );

  return error ? <DataError error={error} /> : renderContent();
}
