import type { ColumnConfig } from '../../../../../../components/tables/types';

export const league_table: readonly ColumnConfig[] = [
  {
    id: 'standing',
    label: '',
    isStatic: true,
    styles: {
      width: 30,
      color: 'label',
    },
  },
  {
    id: 'name',
    label: '',
    type: 'link',
    styles: {
      sticky: true,
      width: 150,
      border: true,
      align: 'left',
    },
  },
  {
    id: 'played',
    label: 'Pl',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'wins',
    label: 'W',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'draws',
    label: 'D',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'losses',
    label: 'L',
    styles: {
      width: 30,
      border: true,
      background: true,
    },
  },
  {
    id: 'goalsFor',
    label: 'GF',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'goalsAgainst',
    label: 'GA',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'goalDiff',
    type: 'difference',
    label: '+/-',
    styles: {
      width: 30,
      border: true,
      background: true,
    },
  },
  {
    id: 'points',
    label: 'Pts',
    styles: {
      width: 30,
      border: true,
      background: true,
    },
  },
] as const;
