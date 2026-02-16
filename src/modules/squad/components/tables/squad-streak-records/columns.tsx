import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'label',
    label: <></>,
    isStatic: true,
    styles: {
      width: 90,
      color: 'label',
      align: 'left',
      border: true,
    },
  },
  {
    id: 'value',
    label: '',
    styles: {
      width: 50,
      background: true,
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
    id: 'more',
    label: <></>,
    styles: {
      width: 60,
    },
  },
] as const;
