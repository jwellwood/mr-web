import { NameCell } from '../../../../../components';
import { StatSkeleton } from '../../../../../components/loaders';
import { FETCH_SQUAD_STATS_QUERY } from '../../../types';

export const rows_averages = (data?: FETCH_SQUAD_STATS_QUERY, loading?: boolean) => {
  const arr = new Array(15).fill({});
  const dataToMap = loading && !data?.stats ? arr : data?.stats;

  return dataToMap?.map(stats => {
    const {
      name,
      apps,
      goals,
      goalsPerGame,
      assists,
      assistsPerGame,
      mvp,
      mvpPerGame,
      conceded,
      concededPerGame,
      cleanSheets,
    } = stats || {};
    return {
      name: {
        value: (
          <NameCell id={stats._id} loading={loading}>
            {name || ''}
          </NameCell>
        ),
      },
      apps: loading ? <StatSkeleton /> : apps,
      goals: loading ? <StatSkeleton /> : goals,
      goalsPerGame: loading ? <StatSkeleton /> : +goalsPerGame?.toFixed(2),
      assists: loading ? <StatSkeleton /> : assists,
      assistsPerGame: loading ? <StatSkeleton /> : +assistsPerGame?.toFixed(2),
      mvp: loading ? <StatSkeleton /> : mvp,
      mvpPerGame: loading ? <StatSkeleton /> : +mvpPerGame?.toFixed(2),
      conceded: loading ? <StatSkeleton /> : conceded,
      concededPerGame: loading ? <StatSkeleton /> : +concededPerGame?.toFixed(2),
      cleanSheets: loading ? <StatSkeleton /> : cleanSheets,
    } as const;
  });
};
