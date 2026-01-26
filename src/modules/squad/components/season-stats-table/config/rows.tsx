import { NameCell } from '../../../../../components';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { returnStatAsZero } from '../../../../../utils/helpers/returnZero';
import { FETCH_SQUAD_STATS_QUERY } from '../../../types';

export const rows = (data?: FETCH_SQUAD_STATS_QUERY, loading?: boolean) => {
  const arr = new Array(15).fill({});
  const dataToMap = loading && !data?.stats ? arr.map(stat => stat) : data?.stats.map(stat => stat);

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
      apps: loading ? <StatSkeleton /> : returnStatAsZero(apps),
      goals: loading ? <StatSkeleton /> : returnStatAsZero(goals),
      assists: loading ? <StatSkeleton /> : returnStatAsZero(assists),
      mvp: loading ? <StatSkeleton /> : returnStatAsZero(mvp),
      conceded: loading ? <StatSkeleton /> : returnStatAsZero(conceded),
      cleanSheets: loading ? <StatSkeleton /> : returnStatAsZero(cleanSheets),
    } as const;
  });
};
