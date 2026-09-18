import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'kickoffTime',
    label: '',
    type: 'link',
    styles: {
      width: 20,
      border: true,
      color: 'label',
    },
  },
  {
    id: 'homeTeam',
    label: 'Home',
    type: 'link',
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
    type: 'link',
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
    type: 'link',
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
    type: 'link',
    styles: {
      width: 10,
      align: 'center',
      color: 'data',
    },
  },
] as const;
