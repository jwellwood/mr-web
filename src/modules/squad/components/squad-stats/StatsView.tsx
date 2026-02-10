import { ReactNode } from 'react';
import { DataError, SectionContainer, NoDataText } from '../../../../components';
import CustomTable from '../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { TFilters } from '../../context/SquadStatsFiltersContext';
import StatFilters from '../../forms/StatsFilters';
import { FETCH_SQUAD_STATS_QUERY } from '../../types';
import { columns, columns_averages, rows, rows_averages, styles, styles_averages } from './config';
import PlayersByNumbers from './PlayersByNumbers';

interface Props {
  error?: TApolloError;
  loading: boolean;
  data?: FETCH_SQUAD_STATS_QUERY;
  filters: TFilters;
}

export default function StatsView({ error, loading, data, filters }: Props) {
  const table_props = () => {
    if (filters.showAverages) {
      return {
        columns: columns_averages,
        rows: rows_averages(data, loading) as Record<string, object | ReactNode>[],
        cellIndexStyles: styles_averages,
      };
    }
    return {
      columns,
      rows: rows(data, loading) as Record<string, object | ReactNode>[],
      cellIndexStyles: styles,
    };
  };

  const renderContent = () => {
    return data && data?.stats.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <>
        <PlayersByNumbers players={data?.stats} loading={loading} />
        <CustomTable {...table_props()} isSortable sortByString="apps" />
      </>
    );
  };
  return (
    <SectionContainer title={<StatFilters />}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
