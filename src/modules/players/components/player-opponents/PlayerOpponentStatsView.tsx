import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../../components';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../types';
import CustomTable from '../../../../components/tables/CustomTable';
import * as CONFIG from './config';
import OpponentsFilters from '../../forms/opponents-filter/OpponentsFilters';
import { usePlayerOpponentFilters } from '../../context';
import { ReactNode } from 'react';

interface Props {
  data?: T_FETCH_PLAYER_OPPONENT_STATS;
  loading: boolean;
  error?: ApolloError;
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
