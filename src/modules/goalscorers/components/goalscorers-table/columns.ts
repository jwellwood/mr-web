import { TFunction } from 'i18next';
import type { ColumnConfig } from '../../../../components/tables/types';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'standing',
      label: '#',
      isStatic: true,
      styles: {
        width: 30,
        color: 'label',
      },
    },
    {
      id: 'name',
      label: t('TABLES.HEADERS.NAME'),
      type: 'link',
      styles: {
        sticky: true,
        width: 120,
        border: true,
        align: 'left',
      },
    },
    {
      id: 'teamBadge',
      label: '',
      type: 'image',
      styles: {
        width: 30,
      },
    },
    {
      id: 'team',
      label: t('TABLES.HEADERS.TEAM'),
      type: 'link',
      styles: {
        sticky: true,
        width: 140,
        border: true,
        align: 'left',
      },
    },
    {
      id: 'goals',
      label: '',
      styles: {
        width: 40,
        background: true,
      },
    },
  ] as const;
