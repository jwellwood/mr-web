import { STAT_ICONS, StatIcon } from '../../../../../components/icons';
import { ColumnConfig } from '../../../../../components/tables';

export const columns: readonly ColumnConfig[] = [
  {
    id: 'playerName',
    label: <></>,
    styles: {
      width: 120,
      align: 'left',
      border: true,
      sticky: true,
    },
  },
  {
    id: 'isStarter',
    label: <StatIcon icon={STAT_ICONS.SUB_IN} />,
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'matchPosition',
    type: 'position',
    label: 'Pos',
    styles: {
      width: 30,
      border: true,
      background: true,
    },
  },
  {
    id: 'goals',
    label: 'Gs',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'assists',
    label: 'As',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'mvp',
    label: 'MVP',
    styles: {
      width: 30,
      background: true,
      border: true,
    },
  },
  {
    id: 'pensScored',
    label: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'pensMissed',
    label: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'ownGoals',
    label: 'OGs',
    styles: {
      width: 30,
      border: true,
      background: true,
    },
  },
  {
    id: 'conceded',
    label: <StatIcon icon={STAT_ICONS.CONCEDED} />,
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'pensSaved',
    label: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    id: 'cleanSheet',
    label: 'CS',
    styles: {
      width: 30,
      border: true,
      background: true,
    },
  },
  {
    label: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
    id: 'yellowCards',
    styles: {
      width: 30,
      background: true,
    },
  },
  {
    label: <StatIcon icon={STAT_ICONS.RED_CARD} />,
    id: 'redCard',
    styles: {
      width: 30,
      background: true,
    },
  },
] as const;
