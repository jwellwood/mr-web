import { ColumnConfig } from '../../../../../components';
import { columns as baseColumns } from './columns';

const avgCols: Record<string, ColumnConfig> = {
  winsAvg: {
    id: 'winsAvg',
    label: '%',
    styles: { width: 35, color: 'label' },
  },
  drawsAvg: {
    id: 'drawsAvg',
    label: '%',
    styles: { width: 35, color: 'label' },
  },
  lossesAvg: {
    id: 'lossesAvg',
    label: '%',
    styles: { width: 35, color: 'label' },
  },
  goalsForAvg: {
    id: 'goalsForAvg',
    label: 'Av',
    styles: { width: 35, color: 'label' },
  },
  goalsAgainstAvg: {
    id: 'goalsAgainstAvg',
    label: 'Av',
    styles: { width: 35, color: 'label' },
  },
  differenceAvg: {
    id: 'differenceAvg',
    type: 'difference',
    label: 'Av',
    styles: { width: 35, color: 'label' },
  },
  goalsAvg: {
    id: 'goalsAvg',
    label: 'Av',
    styles: { width: 35, color: 'label' },
  },
  assistsAvg: {
    id: 'assistsAvg',
    label: 'Av',
    styles: { width: 35, color: 'label' },
  },
  combinedAvg: {
    id: 'combinedAvg',
    label: 'Av',
    styles: { width: 35, color: 'label' },
  },
  concededAvg: {
    id: 'concededAvg',
    label: 'Av',
    styles: { width: 35, color: 'label' },
  },
};

export const columns_averages: readonly ColumnConfig[] = baseColumns.flatMap(col => {
  if (col.id === 'wins') return [col, avgCols.winsAvg];
  if (col.id === 'draws') return [col, avgCols.drawsAvg];
  if (col.id === 'losses') return [col, avgCols.lossesAvg];
  if (col.id === 'goalsFor') return [col, avgCols.goalsForAvg];
  if (col.id === 'goalsAgainst') return [col, avgCols.goalsAgainstAvg];
  if (col.id === 'difference') return [col, avgCols.differenceAvg];
  if (col.id === 'goals') return [col, avgCols.goalsAvg];
  if (col.id === 'assists') return [col, avgCols.assistsAvg];
  if (col.id === 'combined') return [col, avgCols.combinedAvg];
  if (col.id === 'conceded') return [col, avgCols.concededAvg];
  return [col];
}) as readonly ColumnConfig[];
