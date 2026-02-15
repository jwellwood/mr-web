import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'name',
    label: '',
    styles: {
      sticky: true,
      width: 150,
      align: 'left',
      border: true,
    },
  },
  {
    id: 'matches',
    label: 'Pl',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'wins',
    label: 'W',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'draws',
    label: 'D',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'losses',
    label: 'L',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'goalsFor',
    label: 'GF',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'goalsAgainst',
    label: 'GA',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'difference',
    type: 'difference',
    label: '+/-',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'goals',
    label: 'Gs',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'assists',
    label: 'As',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'combined',
    label: 'G+A',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'conceded',
    label: 'Cn',
    styles: {
      width: 35,
      background: true,
    },
  },
] as const;
