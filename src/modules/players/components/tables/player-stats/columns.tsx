import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'icon',
    label: <></>,
    isStatic: true,
  },
  {
    id: 'label',
    label: <></>,
    isStatic: true,
    styles: {
      align: 'left',
      border: true,
    },
  },
  {
    id: 'value',
    label: <></>,
    styles: {
      width: 50,
      background: true,
    },
  },
  {
    id: 'average',
    label: <></>,
    styles: {
      width: 50,
      background: true,
      color: 'label',
    },
  },
] as const;
