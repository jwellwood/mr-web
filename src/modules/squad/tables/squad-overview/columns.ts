import { ColumnConfig } from '../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'number',
    label: '#',
    styles: {
      width: 30,
      color: 'label',
    },
  },
  {
    id: 'position',
    type: 'position',
    label: '',
    styles: {
      width: 30,
    },
  },
  {
    id: 'nationality',
    type: 'nationality',
    label: '',
    styles: {
      width: 30,
    },
  },
  {
    id: 'image',
    type: 'image',
    label: '',
    styles: {
      width: 20,
    },
  },
  {
    id: 'name',
    label: '',
    type: 'link',
    styles: {
      border: true,
      align: 'left',
    },
  },
  {
    id: 'apps',
    label: 'Pl',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'goals',
    label: 'Gs',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'assists',
    label: 'As',
    styles: {
      width: 30,
      background: true,
    },
  },
] as const;
