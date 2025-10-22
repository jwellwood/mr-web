import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../app/constants';
import { ICellStyleByIndex } from '../../../components/tables/types';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const squad_past_players = [
  {
    id: 'position',
    label: '',
  },
  {
    id: 'nationality',
    label: '',
  },
  {
    id: 'image',
    numeric: false,
    label: '',
    width: 20,
  },
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 50,
  },
  {
    id: 'joined',
    numeric: true,
    label: 'From',
    width: 30,
  },
  {
    id: 'left',
    numeric: true,
    label: 'To',
    width: 30,
  },
  {
    id: 'seasons',
    numeric: true,
    label: 'Seasons',
    width: 10,
  },
] as const;

export const past_player_styles: ICellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 1, background: STATIC },
  { index: 2, background: STATIC },
  {
    index: 3,
    background: STATIC,
    border: STANDARD,
  },
  { index: 4, textColor: 'label' },
  {
    index: 5,
    textColor: 'label',
  },
] as const;
