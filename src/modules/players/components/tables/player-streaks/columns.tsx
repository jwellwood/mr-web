import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'label',
      label: '',
      styles: {
        align: 'left',
        border: true,
        color: 'label',
      },
    },
    {
      id: 'current',
      label: t('TABLES.HEADERS.CURRENT'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'longest',
      label: t('TABLES.HEADERS.LONGEST'),
      styles: {
        width: 40,
        background: true,
        border: true,
      },
    },
    {
      id: 'start',
      label: t('TABLES.HEADERS.FROM'),
      styles: {
        background: true,
        color: 'label',
      },
    },
    {
      id: 'end',
      label: t('TABLES.HEADERS.TO'),
      styles: {
        background: true,
        color: 'label',
      },
    },
  ] as const;
