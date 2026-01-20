import { ReactNode } from 'react';

import CustomTable from '../../../../components/tables/CustomTable';
import { TFilters } from '../../context/FiltersContext';
import { ISquadSeasonStats } from '../../types';
import { columns, columns_averages, rows, rows_averages, styles, styles_averages } from './config';

interface Props {
  data?: { stats: ISquadSeasonStats[] };
  loading: boolean;
  filters: TFilters;
}

export default function SquadStatsTable({ data, loading, filters }: Props) {
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

  return <CustomTable {...table_props()} isSortable sortByString="apps" />;
}
