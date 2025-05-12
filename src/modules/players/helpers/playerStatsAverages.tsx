import StatSkeleton from '../../../components/loaders/StatSkeleton';
import { IListItem, IPlayerStats } from '../../../types';
import { getAvg } from '../../../utils/helpers';

export const playerStatsAverages = (stats: IPlayerStats, loading: boolean): IListItem[] => {
  const calcAvgs = () => {
    return {
      goals: getAvg(stats.goals, stats.apps),
      assists: getAvg(stats.assists, stats.apps),
      conceded: getAvg(stats.conceded, stats.apps),
      mvp: getAvg(stats.mvp, stats.apps),
    };
  };

  return [
    {
      label: 'Goals / game',
      value: loading ? <StatSkeleton /> : calcAvgs().goals,
    },
    {
      label: 'Assist / game',
      value: loading ? <StatSkeleton /> : calcAvgs().assists,
    },
    {
      label: 'Conceded / game',
      value: loading ? <StatSkeleton /> : calcAvgs().conceded,
    },
    {
      label: 'MVP / game',
      value: loading ? <StatSkeleton /> : calcAvgs().mvp,
    },
  ];
};
