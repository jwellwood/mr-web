import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const league_table = [
  {
    id: 'standing',
    label: '',
    width: 25,
  },
  {
    id: 'name',
    label: '',
    width: 130,
  },
  {
    id: 'played',
    label: 'Pl',
    width: 25,
  },
  {
    id: 'wins',
    label: 'W',
    width: 25,
  },
  {
    id: 'draws',
    label: 'D',
    width: 25,
  },
  {
    id: 'losses',
    label: 'L',
    width: 25,
  },
  {
    id: 'goalsFor',
    label: 'GF',
    width: 30,
  },
  {
    id: 'goalsAgainst',
    label: 'GA',
    width: 30,
  },
  {
    id: 'goalDiff',
    label: '+/-',
    width: 30,
  },
  {
    id: 'points',
    label: 'Pts',
    width: 40,
  },
] as const;

export const league_table_styles = [
  {
    index: 0,
    background: STATIC,
  },
  {
    index: 1,
    background: STATIC,
    border: STANDARD,
  },
  { index: 5, border: STANDARD },
  { index: 8, border: STANDARD },
  {
    index: 9,
    border: STANDARD,
  },
] as const;
