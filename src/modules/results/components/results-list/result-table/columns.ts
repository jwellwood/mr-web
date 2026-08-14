import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'kickoffTime',
    label: '',
    styles: {
      width: 20,
      border: true,
      color: 'label',
    },
  },
  {
    id: 'homeTeam',
    label: 'Home',
    styles: {
      width: 120,
      align: 'right',
      border: true,
      color: 'data',
    },
  },
  {
    id: 'homeScore',
    label: '',
    type: 'link',
    styles: {
      width: 20,
      background: true,
    },
  },
  {
    id: 'divider',
    label: '',
    styles: {
      width: 5,
      align: 'center',
      color: 'label',
      background: true,
    },
  },
  {
    id: 'awayScore',
    label: '',
    type: 'link',
    styles: {
      width: 20,
      background: true,
      border: true,
    },
  },
  {
    id: 'awayTeam',
    label: 'Away',
    styles: {
      width: 120,
      align: 'left',
      color: 'data',
      border: true,
    },
  },
  {
    id: 'status',
    label: '',
    styles: {
      width: 10,
      align: 'center',
      color: 'data',
    },
  },
] as const;
