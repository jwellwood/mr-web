import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'season',
      type: 'link',
      label: <></>,
      styles: {
        border: true,
      },
    },
    {
      id: 'apps',
      label: t('TABLES.HEADERS.PLAYED'),
      styles: {
        width: 50,
        background: true,
      },
    },
    {
      id: 'goals',
      label: t('TABLES.HEADERS.GOALS'),
      styles: {
        width: 50,
        background: true,
      },
    },
    {
      id: 'assists',
      label: t('TABLES.HEADERS.ASSISTS'),
      styles: {
        width: 50,
        background: true,
      },
    },
    {
      id: 'combined',
      label: t('TABLES.HEADERS.COMBINED'),
      styles: {
        width: 50,
        background: true,
      },
    },
  ] as const;
