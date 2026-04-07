import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components/tables';
import { columns as baseColumns } from './columns';

const avgMap = (t: TFunction): Record<string, ColumnConfig> => ({
  goalsPerGame: {
    id: 'goalsPerGame',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 40, color: 'label' },
  },
  assistsPerGame: {
    id: 'assistsPerGame',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 40, color: 'label' },
  },
  mvpPerGame: {
    id: 'mvpPerGame',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 40, color: 'label' },
  },
  concededPerGame: {
    id: 'concededPerGame',
    label: t('TABLES.HEADERS.AVERAGE'),
    styles: { width: 40, color: 'label' },
  },
});

export const columns_averages = (t: TFunction): readonly ColumnConfig[] =>
  baseColumns(t).flatMap(col => {
    const avg = avgMap(t);
    if (col.id === 'goals') return [col, avg.goalsPerGame];
    if (col.id === 'assists') return [col, avg.assistsPerGame];
    if (col.id === 'mvp') return [col, avg.mvpPerGame];
    if (col.id === 'conceded') return [col, avg.concededPerGame];
    return [col];
  }) as readonly ColumnConfig[];
