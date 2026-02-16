import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'label',
    label: '',
    isStatic: true,
    styles: {
      align: 'left',
      color: 'label',
      border: true,
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
  {
    id: 'average',
    type: 'percentage',
    label: <></>,
    styles: {
      width: 50,
      color: 'label',
      background: true,
    },
  },
] as const;
