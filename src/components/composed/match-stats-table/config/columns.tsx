import type { ColumnConfig } from '../../../tables/types';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'played',
    label: 'Pl',
    styles: {
      width: 40,
      border: true,
      background: true,
    },
  },
  {
    id: 'wins',
    label: 'W',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'draws',
    label: 'D',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'defeats',
    label: 'L',
    styles: {
      width: 40,
      border: true,
      background: true,
    },
  },
  {
    id: 'goalsFor',
    label: 'GF',
    styles: {
      width: 40,
      background: true,
    },
  },
  {
    id: 'goalsAgainst',
    label: 'GA',
    styles: {
      width: 40,
      border: true,
      background: true,
    },
  },
  {
    id: 'difference',
    type: 'difference',
    label: '+/-',
    styles: {
      width: 40,
      background: true,
    },
  },
] as const;
