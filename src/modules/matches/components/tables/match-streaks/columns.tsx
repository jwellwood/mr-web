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
    id: 'longest',
    label: '',
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
