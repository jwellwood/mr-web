import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../components';

export const columns = (t: TFunction<'teamseasons'>): readonly ColumnConfig[] =>
  [
    {
      id: 'name',
      type: 'link',
      label: '',
      styles: {
        width: 50,
      },
    },
    {
      id: 'division',
      label: t('TABLES.DIVISION'),
      styles: {
        align: 'left',
        color: 'label',
        border: true,
      },
    },
    {
      id: 'graph',
      label: t('TABLES.POSITION'),
      styles: {
        width: 90,
        background: true,
      },
    },
    {
      id: 'pos',
      label: '',
      styles: {
        width: 30,
        background: true,
      },
    },
    {
      id: 'more',
      label: '',
      styles: {
        width: 40,
        background: true,
      },
    },
  ] as const;
