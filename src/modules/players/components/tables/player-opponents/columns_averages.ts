import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components/tables';
import { columns } from './columns';

const avgCols = (t: TFunction): Record<string, ColumnConfig> => ({
  winsAvg: {
    id: 'winsAvg',
    label: t('TABLES.HEADERS.PERCENT'),
    styles: { width: 35, color: 'label' },
  },
  drawsAvg: {
    id: 'drawsAvg',
    label: t('TABLES.HEADERS.PERCENT'),
    styles: { width: 35, color: 'label' },
  },
  lossesAvg: {
    id: 'lossesAvg',
    label: t('TABLES.HEADERS.PERCENT'),
    styles: { width: 35, color: 'label' },
  },
  goalsForAvg: {
    id: 'goalsForAvg',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 35, color: 'label' },
  },
  goalsAgainstAvg: {
    id: 'goalsAgainstAvg',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 35, color: 'label' },
  },
  differenceAvg: {
    id: 'differenceAvg',
    type: 'difference',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 35, color: 'label' },
  },
  goalsAvg: {
    id: 'goalsAvg',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 35, color: 'label' },
  },
  assistsAvg: {
    id: 'assistsAvg',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 35, color: 'label' },
  },
  combinedAvg: {
    id: 'combinedAvg',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 35, color: 'label' },
  },
  concededAvg: {
    id: 'concededAvg',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 35, color: 'label' },
  },
});

export const columns_averages = (t: TFunction): readonly ColumnConfig[] =>
  columns(t).flatMap(col => {
    const avg = avgCols(t);
    if (col.id === 'wins') return [col, avg.winsAvg];
    if (col.id === 'draws') return [col, avg.drawsAvg];
    if (col.id === 'losses') return [col, avg.lossesAvg];
    if (col.id === 'goalsFor') return [col, avg.goalsForAvg];
    if (col.id === 'goalsAgainst') return [col, avg.goalsAgainstAvg];
    if (col.id === 'difference') return [col, avg.differenceAvg];
    if (col.id === 'goals') return [col, avg.goalsAvg];
    if (col.id === 'assists') return [col, avg.assistsAvg];
    if (col.id === 'combined') return [col, avg.combinedAvg];
    if (col.id === 'conceded') return [col, avg.concededAvg];
    return [col];
  }) as readonly ColumnConfig[];
