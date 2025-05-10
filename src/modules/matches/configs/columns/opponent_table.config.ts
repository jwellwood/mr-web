import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../app/constants';
import { ICellStyleByIndex } from '../../../../components/tables/types';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const opponent_table = [
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
    id: 'defeats',
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
    id: 'difference',
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
  {
    id: 'winPercentage',
    numeric: true,
    label: 'Win %',
    width: 50,
  },
  {
    id: 'avgScore',
    numeric: true,
    label: 'Avg',
    width: 40,
  },
] as const;

export const opponent_table_styles = [
  {
    index: 0,
    background: STATIC,
    border: STANDARD,
  },
  { index: 4, border: STANDARD },
  { index: 7, border: STANDARD },
  {
    index: 8,
    background: STATIC,
    border: STANDARD,
  },
  { index: 9, textColor: 'label' },
  { index: 10, textColor: 'label' },
] as const;
