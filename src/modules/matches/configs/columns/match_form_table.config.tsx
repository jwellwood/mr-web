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
    label: '',
    width: 100,
  },
  {
    id: 'goals',
    label: 'Goals',
  },
  {
    id: 'assists',
    label: 'Assists',
  },
  {
    id: 'mvp',
    label: 'MVP',
  },
  {
    id: 'pensScored',
    label: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
  },
  {
    id: 'pensMissed',
    label: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
  },
  {
    id: 'ownGoals',
    label: 'OGs',
  },
  {
    id: 'conceded',
    label: <StatIcon icon={STAT_ICONS.CONCEDED} />,
  },
  {
    id: 'pensSaved',
    label: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
  },
  {
    id: 'cleanSheet',
    label: 'CS',
  },
  {
    label: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
    id: 'yellowCards',
  },
  {
    label: <StatIcon icon={STAT_ICONS.RED_CARD} />,
    id: 'redCard',
  },
  {
    id: 'minutes',
    label: <StatIcon icon={STAT_ICONS.MINS} />,
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
