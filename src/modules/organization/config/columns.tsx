import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../app/constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const league_table = [
  {
    id: 'standing',
    numeric: true,
    label: '',
    width: 25,
  },
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 130,
  },
  {
    id: 'played',
    numeric: true,
    label: 'Pl',
    width: 25,
  },
  {
    id: 'wins',
    numeric: true,
    label: 'W',
    width: 25,
  },
  {
    id: 'draws',
    numeric: true,
    label: 'D',
    width: 25,
  },
  {
    id: 'losses',
    numeric: true,
    label: 'L',
    width: 25,
  },
  {
    id: 'goalsFor',
    numeric: true,
    label: 'GF',
    width: 30,
  },
  {
    id: 'goalsAgainst',
    numeric: true,
    label: 'GA',
    width: 30,
  },
  {
    id: 'goalDiff',
    numeric: true,
    label: '+/-',
    width: 30,
  },
  {
    id: 'points',
    numeric: true,
    label: 'Pts',
    width: 40,
  },
] as const;

export const league_table_styles = [
  {
    index: 1,
    background: STATIC,
    border: STANDARD,
  },
  { index: 5, border: STANDARD },
  { index: 8, border: STANDARD },
  {
    index: 9,
    background: STATIC,
    border: STANDARD,
  },
] as const;
