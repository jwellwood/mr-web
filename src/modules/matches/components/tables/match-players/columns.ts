import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'isStarter',
    label: '',
    styles: {
      width: 20,
    },
  },
  {
    id: 'position',
    type: 'position',
    label: '',
    styles: {
      width: 40,
    },
  },
  {
    id: 'name',
    type: 'link',
    label: '',
    styles: {
      width: 140,
      align: 'left',
      border: true,
    },
  },
  {
    id: 'goals',
    label: 'Gs',
    styles: {
      background: true,
      width: 40,
      border: true,
    },
  },
  {
    id: 'assists',
    label: 'As',
    styles: {
      background: true,
      width: 40,
      border: true,
    },
  },
  {
    id: 'conceded',
    label: 'Cn',
    styles: {
      background: true,
      border: true,
      width: 40,
    },
  },
  {
    id: 'mvp',
    label: 'MVP',
    styles: {
      background: true,
      width: 40,
    },
  },
] as const;
