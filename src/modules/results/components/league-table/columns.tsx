import { TFunction } from 'i18next';
import type { ColumnConfig } from '../../../../components/tables/types';

export const league_table = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'standing',
      label: '',
      isStatic: true,
      styles: {
        width: 30,
        color: 'label',
      },
    },
    {
      id: 'name',
      label: '',
      type: 'link',
      styles: {
        sticky: true,
        width: 140,
        border: true,
        align: 'left',
      },
    },
    {
      id: 'played',
      label: t('TABLES.HEADERS.PLAYED'),
      styles: {
        width: 25,
        background: true,
      },
    },
    {
      id: 'wins',
      label: t('TABLES.HEADERS.WINS'),
      styles: {
        width: 25,
        background: true,
      },
    },
    {
      id: 'draws',
      label: t('TABLES.HEADERS.DRAWS'),
      styles: {
        width: 25,
        background: true,
      },
    },
    {
      id: 'losses',
      label: t('TABLES.HEADERS.LOSSES'),
      styles: {
        width: 25,
        border: true,
        background: true,
      },
    },
    {
      id: 'goalsFor',
      label: t('TABLES.HEADERS.GOALS_FOR'),
      styles: {
        width: 30,
        background: true,
      },
    },
    {
      id: 'goalsAgainst',
      label: t('TABLES.HEADERS.GOALS_AGAINST'),
      styles: {
        width: 30,
        background: true,
      },
    },
    {
      id: 'goalDiff',
      type: 'difference',
      label: t('TABLES.HEADERS.GOAL_DIFFERENCE'),
      styles: {
        width: 30,
        border: true,
        background: true,
      },
    },
    {
      id: 'points',
      label: t('TABLES.HEADERS.POINTS'),
      styles: {
        width: 30,
        border: true,
        background: true,
      },
    },
  ] as const;
