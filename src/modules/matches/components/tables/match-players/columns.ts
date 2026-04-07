import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'isStarter',
      label: '',
      styles: {
        width: 20,
      },
    },
    {
      id: 'position',
      type: 'position',
      label: '',
      styles: {
        width: 40,
      },
    },
    {
      id: 'name',
      type: 'link',
      label: '',
      styles: {
        width: 140,
        align: 'left',
        border: true,
      },
    },
    {
      id: 'goals',
      label: t('TABLES.HEADERS.GOALS'),
      styles: {
        background: true,
        width: 40,
        border: true,
      },
    },
    {
      id: 'assists',
      label: t('TABLES.HEADERS.ASSISTS'),
      styles: {
        background: true,
        width: 40,
        border: true,
      },
    },
    {
      id: 'conceded',
      label: t('TABLES.HEADERS.CONCEDED'),
      styles: {
        background: true,
        border: true,
        width: 40,
      },
    },
    {
      id: 'mvp',
      label: 'MVP',
      styles: {
        background: true,
        width: 40,
      },
    },
  ] as const;
