import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../app/constants';
import { ICellStyleByIndex } from '../../../../components/tables/types';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const match_players_table = [
  {
    id: 'isStarter',
    numeric: false,
    label: '',
  },
  {
    id: 'position',
    numeric: false,
    label: '',
    width: 40,
  },
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 150,
  },
  {
    id: 'goals',
    numeric: true,
    label: 'Goals',
  },
  {
    id: 'assists',
    numeric: true,
    label: 'Assists',
  },
  {
    id: 'conceded',
    numeric: true,
    label: 'Conc',
  },
  {
    id: 'mvp',
    numeric: false,
    label: 'MVP',
  },
] as const;

export const match_players_table_styles: ICellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 1, background: STATIC },
  {
    index: 2,
    background: STATIC,
    border: STANDARD,
  },
  {
    index: 5,
    border: STANDARD,
  },
];
