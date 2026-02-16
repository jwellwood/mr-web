import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'rank',
    label: '',
    isStatic: true,
    styles: {
      color: 'label',
      width: 50,
      border: true,
    },
  },
  {
    id: 'players',
    label: '',
    styles: {
      border: true,
      align: 'left',
      background: true,
    },
  },
  {
    id: 'value',
    label: '',
    styles: {
      width: 50,
      background: true,
    },
  },
] as const;
