import { NameCell } from '../../../../../components';
import { StatSkeleton } from '../../../../../components/loaders';
import { FETCH_SQUAD_STATS_QUERY } from '../../../types';

export const rows = (data?: FETCH_SQUAD_STATS_QUERY, loading?: boolean) => {
  const arr = new Array(15).fill({});
  const dataToMap = loading && !data?.stats ? arr : data?.stats;

  return dataToMap?.map(stats => {
    const { name, apps, goals, assists, mvp, conceded, cleanSheets } = stats || {};
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
      assists: loading ? <StatSkeleton /> : assists,
      mvp: loading ? <StatSkeleton /> : mvp,
      conceded: loading ? <StatSkeleton /> : conceded,
      cleanSheets: loading ? <StatSkeleton /> : cleanSheets,
    } as const;
  });
};
