import { ColumnConfig } from '../../../../../components/tables';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'label',
    label: <></>,
    styles: {
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
    },
  },
] as const;
