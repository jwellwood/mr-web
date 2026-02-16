import { ReactNode } from 'react';
import { DataError, SectionContainer, NoDataText } from '../../../../components';
import { CustomTable, CellValue } from '../../../../components/tables';
import { TApolloError } from '../../../../types/apollo';
import { TFilters } from '../../context/SquadStatsFiltersContext';
import StatFilters from '../../forms/StatsFilters';
import { FETCH_SQUAD_STATS_QUERY } from '../../types';
import { columns, columns_averages, rows } from '../tables/squad-stats';
import PlayersByNumbers from './PlayersByNumbers';

interface Props {
  error?: TApolloError;
  loading: boolean;
  data?: FETCH_SQUAD_STATS_QUERY;
  filters: TFilters;
}

export default function StatsView({ error, loading, data, filters }: Props) {
  const renderContent = () => {
    return data && data?.stats.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <>
        <PlayersByNumbers players={data?.stats} loading={loading} />
        <CustomTable
          rows={rows(data, filters.showAverages) as Record<string, CellValue | ReactNode>[]}
          columns={filters.showAverages ? columns_averages : columns}
          isSortable
          sortByString="apps"
          loading={loading}
          loadingRowCount={20}
        />
      </>
    );
  };
  return (
    <SectionContainer title={<StatFilters />}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
