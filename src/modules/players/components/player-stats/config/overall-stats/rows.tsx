import { STAT_ICONS, StatIcon } from '../../../../../../components/icons';
import { StatSkeleton } from '../../../../../../components/loaders';
import { getAvg, getPercentage } from '../../../../../../utils';
import { T_FETCH_PLAYER_STATS } from '../../../../types';

export const rows = (stats?: T_FETCH_PLAYER_STATS['player'], loading?: boolean) => {
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
      value: loading ? <StatSkeleton /> : goals,
      average: loading ? <StatSkeleton /> : getAvg(goals || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.ASSIST} />,
      label: 'Assists',
      value: loading ? <StatSkeleton /> : assists,
      average: loading ? <StatSkeleton /> : getAvg(assists || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.MVP} />,
      label: 'MVP',
      value: loading ? <StatSkeleton /> : mvp,
      average: loading ? <StatSkeleton /> : getAvg(mvp || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
      label: 'Pens Scored',
      value: loading ? <StatSkeleton /> : pensScored,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value: getPercentage(pensScored || 0, (pensScored || 0) + (pensMissed || 0)) || 0,
          isPercentage: true,
        }
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
      label: 'Pens Missed',
      value: loading ? <StatSkeleton /> : pensMissed,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value: getPercentage(pensMissed || 0, (pensScored || 0) + (pensMissed || 0)) || 0,
          isPercentage: true,
        }
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.OWN_GOAL} />,
      label: 'Own Goals',
      value: loading ? <StatSkeleton /> : ownGoals,
      average: loading ? <StatSkeleton /> : getAvg(ownGoals || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CONCEDED} />,
      label: 'Conceded',
      value: loading ? <StatSkeleton /> : conceded,
      average: loading ? <StatSkeleton /> : getAvg(conceded || 0, apps || 0) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
      label: 'Penalties Saved',
      value: loading ? <StatSkeleton /> : pensSaved,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CLEAN_SHEET} />,
      label: 'Clean Sheets',
      value: loading ? <StatSkeleton /> : cleanSheet,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
      label: 'Yellow Cards',
      value: loading ? <StatSkeleton /> : yellowCards,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.RED_CARD} />,
      label: 'Red Cards',
      value: loading ? <StatSkeleton /> : redCard,
      average: '',
    },
  ];
};
