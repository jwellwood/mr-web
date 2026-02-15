import { STAT_ICONS, StatIcon } from '../../../../../../components/icons';
import { getAvg, getPercentage } from '../../../../../../utils';
import { T_FETCH_PLAYER_STATS } from '../../../../types';

export const rows = (stats?: T_FETCH_PLAYER_STATS['player']) => {
  const {
    apps,
    goals,
    assists,
    mvp,
    pensScored,
    pensMissed,
    pensSaved,
    ownGoals,
    conceded,
    cleanSheet,
    yellowCards,
    redCard,
  } = stats || {
    apps: 0,
    goals: 0,
    assists: 0,
    mvp: 0,
    pensScored: 0,
    pensMissed: 0,
    pensSaved: 0,
    ownGoals: 0,
    conceded: 0,
    cleanSheet: 0,
    yellowCards: 0,
    redCard: 0,
  };
  return [
    {
      icon: <StatIcon icon={STAT_ICONS.GOAL} />,
      label: 'Goals',
      value: goals,
      average: getAvg(goals || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.ASSIST} />,
      label: 'Assists',
      value: assists,
      average: getAvg(assists || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.MVP} />,
      label: 'MVP',
      value: mvp,
      average: getAvg(mvp || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
      label: 'Pens Scored',
      value: pensScored,
      average: (getPercentage(pensScored || 0, (pensScored || 0) + (pensMissed || 0)) || 0) + '%',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
      label: 'Pens Missed',
      value: pensMissed,
      average: (getPercentage(pensMissed || 0, (pensScored || 0) + (pensMissed || 0)) || 0) + '%',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.OWN_GOAL} />,
      label: 'Own Goals',
      value: ownGoals,
      average: getAvg(ownGoals || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CONCEDED} />,
      label: 'Conceded',
      value: conceded,
      average: getAvg(conceded || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
      label: 'Penalties Saved',
      value: pensSaved,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CLEAN_SHEET} />,
      label: 'Clean Sheets',
      value: cleanSheet,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
      label: 'Yellow Cards',
      value: yellowCards,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.RED_CARD} />,
      label: 'Red Cards',
      value: redCard,
      average: '',
    },
  ];
};
