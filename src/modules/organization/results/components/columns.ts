import type { ColumnConfig } from '../../../../components/tables/types';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'homeTeam',
    label: 'Home',
    styles: {
      width: 130,
      align: 'right',
      border: true,
      color: 'label',
    },
  },
  {
    id: 'homeScore',
    label: '',
    type: 'link',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'awayScore',
    type: 'link',
    label: '',
    styles: {
      width: 30,
      border: true,
      background: true,
    },
  },
  {
    id: 'awayTeam',
    label: 'Away',
    styles: {
      width: 120,
      align: 'left',
      border: true,
      color: 'label',
    },
  },
  {
    id: 'status',
    label: 'Status',
    type: 'link',
    styles: {
      width: 50,
      border: true,
      background: true,
    },
  },
] as const;
