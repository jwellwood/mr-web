import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components/tables';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'name',
      type: 'link',
      label: '',
      styles: {
        sticky: true,
        width: 130,
        align: 'left',
        border: true,
      },
    },
    {
      id: 'apps',
      label: t('TABLES.HEADERS.PLAYED'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'goals',
      label: t('TABLES.HEADERS.GOALS'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'assists',
      label: t('TABLES.HEADERS.ASSISTS'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'mvp',
      label: t('TABLES.HEADERS.MVP'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'conceded',
      label: t('TABLES.HEADERS.CONCEDED'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'cleanSheets',
      label: t('TABLES.HEADERS.CLEAN_SHEETS'),
      styles: {
        width: 40,
        background: true,
      },
    },
  ] as const;
