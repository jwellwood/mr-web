import { BACKGROUND_STYLE } from 'app/constants';
import { CellStyleByIndex } from 'components/tables/types';

const { STATIC } = BACKGROUND_STYLE;

export const player_stats = [
  {
    id: 'icon',
    label: '',
  },
  {
    id: 'label',
    label: '',
  },
  {
    id: 'value',
    numeric: true,
    width: 30,
  },
  {
    id: 'average',
    numeric: true,
    label: '',
    width: 30,
  },
];

export const player_stats_styles: CellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 1, background: STATIC },
  { index: 3, textColor: 'label' },
];
