import { ApolloError } from '@apollo/client';
import { DataError, SectionContainer, NoDataText } from '../../../../../components';
import CustomTable from '../../../../../components/tables/CustomTable';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../../types';
import { columns, rows, styles } from './config';

interface Props {
  data?: FETCH_SQUAD_RECORDS_QUERY;
  loading: boolean;
  error?: ApolloError;
}

export default function SquadOverallRecordsView({ data, loading, error }: Props) {
  const renderContent = () => (
    <SectionContainer title="Overall Records">
      {data?.stats && !data.stats.apps?.length ? (
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
