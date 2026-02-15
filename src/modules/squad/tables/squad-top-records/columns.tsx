import { ColumnConfig } from '../../../../components/tables';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'rank',
    label: <></>,
    isStatic: true,
    styles: {
      width: 30,
      border: true,
      color: 'label',
    },
  },
  {
    id: 'names',
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
      width: 40,
      background: true,
    },
  },
] as const;
