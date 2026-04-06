import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components/tables';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'name',
      label: '',
      styles: {
        sticky: true,
        width: 150,
        align: 'left',
        border: true,
      },
    },
    {
      id: 'matches',
      label: t('TABLES.HEADERS.PLAYED'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'wins',
      label: t('TABLES.HEADERS.WINS'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'draws',
      label: t('TABLES.HEADERS.DRAWS'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'losses',
      label: t('TABLES.HEADERS.LOSSES'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'goalsFor',
      label: t('TABLES.HEADERS.GOALS_FOR'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'goalsAgainst',
      label: t('TABLES.HEADERS.GOALS_AGAINST'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'difference',
      type: 'difference',
      label: t('TABLES.HEADERS.DIFFERENCE'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'goals',
      label: t('TABLES.HEADERS.GOALS'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'assists',
      label: t('TABLES.HEADERS.ASSISTS'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'combined',
      label: t('TABLES.HEADERS.COMBINED'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'conceded',
      label: t('TABLES.HEADERS.CONCEDED'),
      styles: {
        width: 35,
        background: true,
      },
    },
  ] as const;
