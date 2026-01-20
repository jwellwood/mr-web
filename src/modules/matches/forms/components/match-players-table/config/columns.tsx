import { STAT_ICONS } from '../../../../../../components/icons/icons';
import StatIcon from '../../../../../../components/icons/StatIcon';

export const columns = [
  {
    id: 'playerName',
    label: <></>,
    width: 120,
  },
  {
    id: 'isStarter',
    label: <StatIcon icon={STAT_ICONS.SUB_IN} />,
    width: 30,
  },
  {
    id: 'matchPosition',
    label: 'Pos',
    width: 30,
  },
  {
    id: 'goals',
    label: 'Gs',
    width: 30,
  },
  {
    id: 'assists',
    label: 'As',
    width: 30,
  },
  {
    id: 'mvp',
    label: 'MVP',
    width: 30,
  },
  {
    id: 'pensScored',
    label: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
    width: 30,
  },
  {
    id: 'pensMissed',
    label: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
    width: 30,
  },
  {
    id: 'ownGoals',
    label: 'OGs',
    width: 30,
  },
  {
    id: 'conceded',
    label: <StatIcon icon={STAT_ICONS.CONCEDED} />,
    width: 30,
  },
  {
    id: 'pensSaved',
    label: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
    width: 30,
  },
  {
    id: 'cleanSheet',
    label: 'CS',
    width: 30,
  },
  {
    label: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
    id: 'yellowCards',
    width: 30,
  },
  {
    label: <StatIcon icon={STAT_ICONS.RED_CARD} />,
    id: 'redCard',
    width: 30,
  },
] as const;
