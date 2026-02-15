import { DataError, SectionContainer, NoDataText } from '../../../../../components';
import { CustomTable } from '../../../../../components/tables';
import { TApolloError } from '../../../../../types/apollo';
import { columns, rows } from '../../../tables/squad-overall-records';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../../types';

interface Props {
  data?: FETCH_SQUAD_RECORDS_QUERY;
  loading: boolean;
  error?: TApolloError;
}

export default function SquadOverallRecordsView({ data, loading, error }: Props) {
  const renderContent = () => (
    <SectionContainer title="Overall Records">
      {data?.stats && !data.stats.apps?.length ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <CustomTable
          columns={columns}
          rows={rows(data)}
          isSortable={false}
          loading={loading}
          loadingRowCount={4}
        />
      )}
    </SectionContainer>
  );

  return error ? <DataError error={error} /> : renderContent();
}
