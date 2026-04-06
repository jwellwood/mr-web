import type { TFunction } from 'i18next';
import type { ColumnConfig } from '../../../tables/types';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'played',
      label: t('MATCH_TABLES.HEADERS.PLAYED'),
      styles: {
        width: 40,
        border: true,
        background: true,
      },
    },
    {
      id: 'wins',
      label: t('MATCH_TABLES.HEADERS.WINS'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'draws',
      label: t('MATCH_TABLES.HEADERS.DRAWS'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'defeats',
      label: t('MATCH_TABLES.HEADERS.DEFEATS'),
      styles: {
        width: 40,
        border: true,
        background: true,
      },
    },
    {
      id: 'goalsFor',
      label: t('MATCH_TABLES.HEADERS.GOALS_FOR'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'goalsAgainst',
      label: t('MATCH_TABLES.HEADERS.GOALS_AGAINST'),
      styles: {
        width: 40,
        border: true,
        background: true,
      },
    },
    {
      id: 'difference',
      type: 'difference',
      label: t('MATCH_TABLES.HEADERS.DIFFERENCE'),
      styles: {
        width: 40,
        background: true,
      },
    },
  ] as const;
