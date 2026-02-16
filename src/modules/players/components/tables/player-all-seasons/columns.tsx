import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'season',
    type: 'link',
    label: <></>,
    styles: {
      border: true,
    },
  },
  {
    id: 'apps',
    label: 'Pl',
    styles: {
      width: 50,
      background: true,
    },
  },
  {
    id: 'goals',
    label: 'Gs',
    styles: {
      width: 50,
      background: true,
    },
  },
  {
    id: 'assists',
    label: 'As',
    styles: {
      width: 50,
      background: true,
    },
  },
  {
    id: 'combined',
    label: 'G+A',
    styles: {
      width: 50,
      background: true,
    },
  },
] as const;
