import { NameCell } from '../../../../../components';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { returnStatAsZero } from '../../../../../utils/helpers/returnZero';
import { ISquadSeasonStats } from '../../../types';

export const rows_averages = (data?: { stats: ISquadSeasonStats[] }, loading?: boolean) => {
  const arr = new Array(15).fill({});
  const dataToMap = loading && !data?.stats ? arr.map(stat => stat) : data?.stats.map(stat => stat);

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
      apps: loading ? <StatSkeleton /> : returnStatAsZero(apps),
      goals: loading ? <StatSkeleton /> : returnStatAsZero(goals),
      goalsPerGame: loading ? <StatSkeleton /> : returnStatAsZero(+goalsPerGame?.toFixed(2)),
      assists: loading ? <StatSkeleton /> : returnStatAsZero(assists),
      assistsPerGame: loading ? <StatSkeleton /> : returnStatAsZero(+assistsPerGame?.toFixed(2)),
      mvp: loading ? <StatSkeleton /> : returnStatAsZero(mvp),
      mvpPerGame: loading ? <StatSkeleton /> : returnStatAsZero(+mvpPerGame?.toFixed(2)),
      conceded: loading ? <StatSkeleton /> : returnStatAsZero(conceded),
      concededPerGame: loading ? <StatSkeleton /> : returnStatAsZero(+concededPerGame?.toFixed(2)),
      cleanSheets: loading ? <StatSkeleton /> : returnStatAsZero(cleanSheets),
    } as const;
  });
};
