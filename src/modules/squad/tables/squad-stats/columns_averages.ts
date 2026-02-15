import { ColumnConfig } from '../../../../components/tables';
import { columns as baseColumns } from './columns';

const avgMap: Record<string, ColumnConfig> = {
  goalsPerGame: {
    id: 'goalsPerGame',
    label: 'Av',
    styles: { width: 40, color: 'label' },
  },
  assistsPerGame: {
    id: 'assistsPerGame',
    label: 'Av',
    styles: { width: 40, color: 'label' },
  },
  mvpPerGame: {
    id: 'mvpPerGame',
    label: 'Av',
    styles: { width: 40, color: 'label' },
  },
  concededPerGame: {
    id: 'concededPerGame',
    label: 'Av',
    styles: { width: 40, color: 'label' },
  },
};

export const columns_averages: readonly ColumnConfig[] = baseColumns.flatMap(col => {
  if (col.id === 'goals') return [col, avgMap.goalsPerGame];
  if (col.id === 'assists') return [col, avgMap.assistsPerGame];
  if (col.id === 'mvp') return [col, avgMap.mvpPerGame];
  if (col.id === 'conceded') return [col, avgMap.concededPerGame];
  return [col];
}) as readonly ColumnConfig[];
