import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { usePlayerOpponentFilters } from '../../context';
import OpponentsFilters from '../../forms/opponents-filter/OpponentsFilters';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../types';
import { columns, columns_averages, rows } from './config';

interface Props {
  data?: T_FETCH_PLAYER_OPPONENT_STATS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerOpponentStatsView({ data, loading, error }: Props) {
  const { filters } = usePlayerOpponentFilters();

  return (
    <SectionContainer title={<OpponentsFilters />}>
      {error ? (
        <DataError error={error} />
      ) : !loading && !data?.stats[0]?.matches ? (
        <NoDataText>No matches played</NoDataText>
      ) : (
        <CustomTable
          rows={rows(data?.stats, loading, filters.showAverages)}
          columns={filters.showAverages ? columns_averages : columns}
          isSortable
          sortByString="matches"
          loading={loading}
        />
      )}
    </SectionContainer>
  );
}
