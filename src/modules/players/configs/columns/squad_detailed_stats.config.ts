import { BACKGROUND_STYLE, BORDER_STYLE } from 'app/constants';
import { CellStyleByIndex, HeadCell } from 'components/tables/types';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const squad_detailed_stats: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 100,
    padding: '4px 16px',
  },
  {
    id: 'apps',
    numeric: true,
    label: 'Apps',
    width: 50,
  },
  {
    id: 'goals',
    numeric: true,
    label: 'Goals',
    width: 50,
  },
  {
    id: 'goalsPerGame',
    numeric: true,
    label: 'Avg',
    width: 50,
  },
  {
    id: 'assists',
    numeric: true,
    label: 'Assists',
    width: 50,
  },
  {
    id: 'assistsPerGame',
    numeric: true,
    label: 'Avg',
    width: 50,
  },
  {
    id: 'mvp',
    numeric: true,
    label: 'MVPs',
    width: 50,
  },
  {
    id: 'mvpPerGame',
    numeric: true,
    label: 'Avg',
    width: 50,
  },
  {
    id: 'conceded',
    numeric: true,
    label: 'Conc',
    width: 50,
  },
  {
    id: 'concededPerGame',
    numeric: true,
    label: 'Avg',
    width: 50,
  },
  {
    id: 'cleanSheets',
    numeric: true,
    label: 'C/S',
    width: 50,
  },
];

export const season_stats_styles: CellStyleByIndex[] = [
  {
    index: 0,
    background: STATIC,
    border: STANDARD,
  },
  { index: 1, border: STANDARD, textColor: 'label' },
  { index: 3, border: STANDARD, textColor: 'label' },
  { index: 5, border: STANDARD, textColor: 'label' },
  { index: 7, border: STANDARD, textColor: 'label' },
  { index: 9, border: STANDARD, textColor: 'label' },
];
