import { ColumnConfig } from '../../../../../../components';

export const columns: readonly ColumnConfig[] = [
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
    label: 'Current',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'longest',
    label: 'Longest',
    styles: {
      width: 40,
      background: true,
      border: true,
    },
  },
  {
    id: 'start',
    label: 'From',
    styles: {
      background: true,
      color: 'label',
    },
  },
  {
    id: 'end',
    label: 'To',
    styles: {
      background: true,
      color: 'label',
    },
  },
] as const;
