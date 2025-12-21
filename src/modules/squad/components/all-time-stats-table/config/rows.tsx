import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { NameCell } from '../../../../../components';
import { returnStatAsZero } from '../../../../../utils/helpers/returnZero';
import { AllPlayerStreaks } from '../../../../players/types';
import { ISquadSeasonStats } from '../../../types';

export const rows = (
  data?: { stats: ISquadSeasonStats[] },
  streakData?: { streaks: AllPlayerStreaks[] },
  loading?: boolean
) => {
  const arr = new Array(15).fill({});
  const dataToMap = loading ? arr.map(stat => stat) : data?.stats?.map(stat => stat);

  return dataToMap?.map(stats => {
    const playedStreak = streakData?.streaks?.find(streak => streak.playerId === stats._id) || {
      longestPlayedStreak: 0,
    };

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
      playedStreak: loading ? (
        <StatSkeleton />
      ) : (
        returnStatAsZero(playedStreak?.longestPlayedStreak)
      ),
    };
  });
};
