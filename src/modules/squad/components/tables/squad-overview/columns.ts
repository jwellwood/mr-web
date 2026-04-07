import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'number',
      label: t('TABLES.HEADERS.NUMBER'),
      styles: {
        width: 30,
        color: 'label',
      },
    },
    {
      id: 'position',
      type: 'position',
      label: '',
      styles: {
        width: 30,
      },
    },
    {
      id: 'nationality',
      type: 'nationality',
      label: '',
      styles: {
        width: 30,
      },
    },
    {
      id: 'image',
      type: 'image',
      label: '',
      styles: {
        width: 20,
      },
    },
    {
      id: 'name',
      label: '',
      type: 'link',
      styles: {
        border: true,
        align: 'left',
      },
    },
    {
      id: 'apps',
      label: t('TABLES.HEADERS.PLAYED'),
      styles: {
        width: 30,
        background: true,
      },
    },
    {
      id: 'goals',
      label: t('TABLES.HEADERS.GOALS'),
      styles: {
        width: 30,
        background: true,
      },
    },
    {
      id: 'assists',
      label: t('TABLES.HEADERS.ASSISTS'),
      styles: {
        width: 30,
        background: true,
      },
    },
  ] as const;
