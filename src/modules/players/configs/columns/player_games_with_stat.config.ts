import { BACKGROUND_STYLE } from 'app/constants';
import { CellStyleByIndex } from 'components/tables/types';

const { STATIC } = BACKGROUND_STYLE;

export const player_games_with_stat = [
  {
    id: 'label',
    label: '',
  },
  {
    id: 'value',
    numeric: true,
    label: '',
    width: 30,
  },
  {
    id: 'average',
    numeric: true,
    label: '',
    width: 30,
  },
];

export const game_with_stat_styles: CellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 2, textColor: 'label' },
];
