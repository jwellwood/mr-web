import { ColumnConfig } from '../../../../../components/tables';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'label',
    label: <></>,
    isStatic: true,
    styles: {
      width: 90,
      align: 'left',
      border: true,
      color: 'label',
    },
  },
  {
    id: 'value',
    label: <></>,
    styles: {
      width: 50,
      background: true,
      border: true,
    },
  },
  {
    id: 'names',
    label: <></>,
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
