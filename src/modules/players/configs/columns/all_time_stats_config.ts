import { ICellStyleByIndex, IHeadCell } from '../../../../components/tables/types';
import {BACKGROUND_STYLE, BORDER_STYLE} from "../../../../app/constants.ts";

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const all_time_stats_config: IHeadCell[] = [
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
    id: 'assists',
    numeric: true,
    label: 'Assists',
    width: 50,
  },

  {
    id: 'mvp',
    numeric: true,
    label: 'MVPs',
    width: 50,
  },

  {
    id: 'conceded',
    numeric: true,
    label: 'Conc',
    width: 50,
  },
  {
    id: 'cleanSheets',
    numeric: true,
    label: 'C/S',
    width: 50,
  },
];

export const all_time_stats_styles = (): ICellStyleByIndex[] => [
  {
    index: 0,
    background: STATIC,
    border: STANDARD,
  },
];
