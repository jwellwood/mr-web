import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../constants';
import { STAT_ICONS } from '../../../../components/icons/icons';
import StatIcon from '../../../../components/icons/StatIcon';
import { ICellStyleByIndex } from '../../../../components/tables/types';

const { STANDARD } = BORDER_STYLE;
const { STATIC } = BACKGROUND_STYLE;

export const match_form_table = [
  {
    id: 'isStarter',
    label: <StatIcon icon={STAT_ICONS.SUB_IN} />,
  },
  {
    id: 'matchPosition',
    label: 'Pos',
    width: 30,
  },
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 100,
  },
  {
    id: 'goals',
    label: 'Goals',
    numeric: true,
  },
  {
    id: 'assists',
    label: 'Assists',
    numeric: true,
  },
  {
    id: 'mvp',
    label: 'MVP',
  },
  {
    id: 'pensScored',
    label: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
    numeric: true,
  },
  {
    id: 'pensMissed',
    label: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
    numeric: true,
  },
  {
    id: 'ownGoals',
    label: 'OGs',
    numeric: true,
  },
  {
    id: 'conceded',
    label: <StatIcon icon={STAT_ICONS.CONCEDED} />,
    numeric: true,
  },
  {
    id: 'pensSaved',
    label: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
    numeric: true,
  },
  {
    id: 'cleanSheet',
    label: 'CS',
  },
  {
    label: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
    id: 'yellowCards',
    numeric: true,
  },
  {
    label: <StatIcon icon={STAT_ICONS.RED_CARD} />,
    id: 'redCard',
  },
  {
    id: 'minutes',
    label: <StatIcon icon={STAT_ICONS.MINS} />,
    numeric: true,
    width: 30,
  },
] as const;

export const match_form_table_styles: ICellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 1, background: STATIC },
  {
    index: 2,
    background: STATIC,
    border: STANDARD,
  },
  { index: 5, border: STANDARD },
  { index: 7, border: STANDARD },
  { index: 8, border: STANDARD },
  { index: 11, border: STANDARD },
] as const;
