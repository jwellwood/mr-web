import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'name',
      label: '',
      styles: {
        width: 150,
        border: true,
        align: 'left',
      },
    },
    {
      id: 'played',
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
      id: 'defeats',
      label: t('TABLES.HEADERS.DEFEATS'),
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
      id: 'points',
      label: t('TABLES.HEADERS.POINTS'),
      styles: {
        width: 35,
        background: true,
      },
    },
    {
      id: 'winPercentage',
      label: t('TABLES.HEADERS.WIN_PERCENT'),
      styles: {
        width: 50,
      },
    },
    {
      id: 'avgScore',
      label: t('TABLES.HEADERS.AVERAGE'),
      styles: {
        width: 50,
      },
    },
  ] as const;
