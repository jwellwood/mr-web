import { ReactNode } from 'react';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { usePlayerOpponentFilters } from '../../context';
import OpponentsFilters from '../../forms/opponents-filter/OpponentsFilters';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../types';
import * as CONFIG from './config';

interface Props {
  data?: T_FETCH_PLAYER_OPPONENT_STATS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerOpponentStatsView({ data, loading, error }: Props) {
  const { filters } = usePlayerOpponentFilters();

  const table_props = () => {
    if (filters.showAverages) {
      return {
        columns: CONFIG.columns_averages,
        rows: CONFIG.rows_averages(data?.stats, loading) as Record<string, object | ReactNode>[],
        cellIndexStyles: CONFIG.styles_averages,
      };
    }
    return {
      columns: CONFIG.columns,
      rows: CONFIG.rows(data?.stats, loading) as Record<string, object | ReactNode>[],
      cellIndexStyles: CONFIG.styles,
    };
  };

  return (
    <SectionContainer title={<OpponentsFilters />}>
      {error ? (
        <DataError error={error} />
      ) : !loading && !data?.stats[0]?.matches ? (
        <NoDataText>No matches played</NoDataText>
      ) : (
        <CustomTable {...table_props()} isSortable sortByString="matches" />
      )}
    </SectionContainer>
  );
}
