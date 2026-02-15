import { ColumnConfig } from '../../../../../components';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'name',
    label: '',
    styles: {
      width: 150,
      border: true,
      align: 'left',
    },
  },
  {
    id: 'played',
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
    id: 'defeats',
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
    id: 'points',
    label: 'Pts',
    styles: {
      width: 35,
      background: true,
    },
  },
  {
    id: 'winPercentage',
    label: 'Win %',
    styles: {
      width: 50,
    },
  },
  {
    id: 'avgScore',
    label: 'Avg',
    styles: {
      width: 50,
    },
  },
] as const;
