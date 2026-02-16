import { ColumnConfig } from '../../../../../components/tables';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'name',
    type: 'link',
    label: '',
    styles: {
      sticky: true,
      width: 130,
      align: 'left',
      border: true,
    },
  },
  {
    id: 'apps',
    label: 'Pl',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'goals',
    label: 'Gs',
    styles: {
      width: 40,
      background: true,
    },
  },

  {
    id: 'assists',
    label: 'As',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'mvp',
    label: 'Mvp',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'conceded',
    label: 'Con',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'cleanSheets',
    label: 'C/S',
    styles: {
      width: 40,
      background: true,
    },
  },
] as const;
