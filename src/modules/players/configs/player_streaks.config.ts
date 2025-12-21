import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../constants';
import { ICellStyleByIndex } from '../../../components/tables/types';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const player_streaks = [
  {
    id: 'label',
    label: '',
  },
  {
    id: 'current',
    numeric: true,
    label: 'Current',
    width: 30,
  },
  {
    id: 'longest',
    numeric: true,
    label: 'Longest',
    width: 30,
  },
  {
    id: 'start',
    label: 'From',
  },
  {
    id: 'end',
    label: 'To',
  },
] as const;

export const player_streaks_styles: ICellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 1, textColor: 'label', border: STANDARD },
  { index: 3, textColor: 'label' },
  { index: 4, textColor: 'label' },
];
