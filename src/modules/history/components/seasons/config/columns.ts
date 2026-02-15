import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
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
    label: 'Division',
    styles: {
      align: 'left',
      color: 'label',
      border: true,
    },
  },
  {
    id: 'graph',
    label: 'Position',
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
