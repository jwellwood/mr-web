import { BORDER_STYLE } from '../../../../app/constants';
import { ICellStyleByIndex } from '../../../../components/tables/types';

export const match_table = [
  {
    id: 'played',
    numeric: true,
    label: 'Pl',
    width: 40,
  },
  {
    id: 'wins',
    numeric: true,
    label: 'W',
    width: 40,
  },
  {
    id: 'draws',
    numeric: true,
    label: 'D',
    width: 40,
  },
  {
    id: 'defeats',
    numeric: true,
    label: 'L',
    width: 40,
  },
  {
    id: 'goalsFor',
    numeric: true,
    label: 'GF',
    width: 40,
  },
  {
    id: 'goalsAgainst',
    numeric: true,
    label: 'GA',
    width: 40,
  },
  {
    id: 'difference',
    numeric: true,
    label: '+/-',
    width: 40,
  },
] as const;

export const match_table_styles: ICellStyleByIndex[] = [
  { index: 0, border: BORDER_STYLE.STANDARD },
  { index: 3, border: BORDER_STYLE.STANDARD },
  { index: 5, border: BORDER_STYLE.STANDARD },
] as const;
