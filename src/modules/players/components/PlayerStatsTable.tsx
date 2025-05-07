import React from 'react';
import { STAT_ICONS } from 'app/icons';
import StatIcon from 'components/icons/StatIcon';
import StatSkeleton from 'components/loaders/StatSkeleton';
import CustomTable from 'components/tables/CustomTable';
import { IPlayerStats } from 'types';
import { getAvg, getPercentage } from 'utils/helpers';
import { player_stats, player_stats_styles } from '../configs';

type Props = {
  stats: IPlayerStats;
  loading: boolean;
};

const PlayerStatsTable: React.FC<Props> = ({ stats, loading }) => {
  const rows = [
    {
      icon: <StatIcon icon={STAT_ICONS.GOAL} />,
      label: `Goals`,
      value: loading ? <StatSkeleton /> : stats.goals || 0,
      average: loading ? (
        <StatSkeleton />
      ) : (
        getAvg(stats.goals, stats.apps) || 0
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.ASSIST} />,
      label: 'Assists',
      value: loading ? <StatSkeleton /> : stats.assists || 0,
      average: loading ? (
        <StatSkeleton />
      ) : (
        getAvg(stats.assists, stats.apps) || 0
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.MVP} />,
      label: 'MVP',
      value: loading ? <StatSkeleton /> : stats.mvp || 0,
      average: loading ? <StatSkeleton /> : getAvg(stats.mvp, stats.apps) || 0,
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SCORED} />,
      label: 'Pens Scored',
      value: loading ? <StatSkeleton /> : stats.pensScored || 0,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value:
            getPercentage(
              stats.pensScored,
              stats.pensScored + stats.pensMissed
            ) || 0,
          isPercentage: true,
        }
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_MISSED} />,
      label: 'Pens Missed',
      value: loading ? <StatSkeleton /> : stats.pensMissed || 0,
      average: loading ? (
        <StatSkeleton />
      ) : (
        {
          value:
            getPercentage(
              stats.pensMissed,
              stats.pensScored + stats.pensMissed
            ) || 0,
          isPercentage: true,
        }
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.OWN_GOAL} />,
      label: 'Own Goals',
      value: loading ? <StatSkeleton /> : stats.ownGoals || 0,
      average: loading ? (
        <StatSkeleton />
      ) : (
        getAvg(stats.ownGoals, stats.apps) || 0
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CONCEDED} />,
      label: 'Conceded',
      value: loading ? <StatSkeleton /> : stats.conceded || 0,
      average: loading ? (
        <StatSkeleton />
      ) : (
        getAvg(stats.conceded, stats.apps) || 0
      ),
    },
    {
      icon: <StatIcon icon={STAT_ICONS.PEN_SAVED} />,
      label: 'Penalties Saved',
      value: loading ? <StatSkeleton /> : stats.pensSaved || 0,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.CLEAN_SHEET} />,
      label: 'Clean Sheets',
      value: loading ? <StatSkeleton /> : stats.cleanSheet || 0,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.YELLOW_CARD} />,
      label: 'Yellow Cards',
      value: loading ? <StatSkeleton /> : stats.yellowCards || 0,
      average: '',
    },
    {
      icon: <StatIcon icon={STAT_ICONS.RED_CARD} />,
      label: 'Red Cards',
      value: loading ? <StatSkeleton /> : stats.redCard || 0,
      average: '',
    },
  ];

  return (
    <CustomTable
      columns={player_stats}
      rows={rows}
      isSortable={false}
      cellIndexStyles={player_stats_styles}
    />
  );
};

export default PlayerStatsTable;
