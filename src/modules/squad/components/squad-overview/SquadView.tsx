import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { FETCH_SQUAD_LIST_BY_SEASON_QUERY } from '../../types';
import { columns, rows } from '../tables/squad-overview';

interface Props {
  error?: TApolloError;
  data?: FETCH_SQUAD_LIST_BY_SEASON_QUERY;
  loading: boolean;
}

export default function SquadView({ error, data, loading }: Props) {
  const renderData = () => {
    return data && data.players.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(data?.players, loading) ?? []}
        isSortable
        sortByString="position"
        loading={loading}
        loadingRowCount={20}
      />
    );
  };

  return <SectionContainer>{error ? <DataError error={error} /> : renderData()}</SectionContainer>;
}
