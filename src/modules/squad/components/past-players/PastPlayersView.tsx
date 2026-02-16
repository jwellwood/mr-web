import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { FETCH_PAST_PLAYERS_QUERY } from '../../types';
import { columns, rows } from '../tables/past-players';

interface Props {
  data?: FETCH_PAST_PLAYERS_QUERY;
  error?: TApolloError;
  loading: boolean;
}

export default function PastPlayersView({ error, data, loading }: Props) {
  const renderData =
    data?.players.length === 0 ? (
      <NoDataText>No past players yet</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(data)}
        isSortable
        sortByString="seasons"
        loading={loading}
        loadingRowCount={20}
      />
    );

  return <SectionContainer>{error ? <DataError error={error} /> : renderData}</SectionContainer>;
}
