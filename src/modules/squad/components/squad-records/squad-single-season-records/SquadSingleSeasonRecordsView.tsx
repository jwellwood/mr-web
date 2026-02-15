import { DataError, SectionContainer, NoDataText } from '../../../../../components';
import { CustomTable } from '../../../../../components/tables';
import { TApolloError } from '../../../../../types/apollo';
import { columns, rows } from '../../../tables/squad-single-season-records';
import { type FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../../types';

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
          rows={rows(data)}
          isSortable={false}
          loading={loading}
          loadingRowCount={3}
        />
      )}
    </SectionContainer>
  );

  return error ? <DataError error={error} /> : renderContent();
}
