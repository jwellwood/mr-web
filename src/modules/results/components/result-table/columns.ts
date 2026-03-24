import { ColumnConfig } from '../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'kickoffTime',
    label: '',
    styles: {
      width: 40,
      border: true,
      color: 'label',
    },
  },
  {
    id: 'homeTeam',
    label: 'Home',
    styles: {
      width: 130,
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
      color: 'data',
    },
  },
  {
    id: 'status',
    label: '',
    type: 'link',
    styles: {
      width: 20,
      border: true,
      background: true,
    },
  },
] as const;
