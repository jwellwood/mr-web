import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import NameCell from '../../../components/tables/NameCell';
import { returnStatAsZero } from '../../../utils/helpers/returnZero.tsx';
import { AllPlayerStreaks } from '../types.ts';

export const getSquadAllTimeTableData = (
  data: { stats: object[] },
  streakData: { streaks: AllPlayerStreaks[] },
  loading: boolean,
  streakLoading: boolean
) => {
  const arr = new Array(15).fill({});
  const dataToMap =
    loading || streakLoading ? arr.map(stat => stat) : data?.stats?.map(stat => stat);

  return dataToMap.map(stats => {
    const playedStreak = streakData?.streaks?.find(streak => streak.playerId === stats._id) || {
      longestPlayedStreak: 0,
    };

    const { name, apps, goals, assists, mvp, conceded, cleanSheets } = stats || {};
    return {
      name: {
        value: <NameCell id={stats._id}>{name || <CustomSkeleton width="90px" />}</NameCell>,
      },
      apps: returnStatAsZero(apps),
      goals: returnStatAsZero(goals),
      assists: returnStatAsZero(assists),
      mvp: returnStatAsZero(mvp),
      conceded: returnStatAsZero(conceded),
      cleanSheets: returnStatAsZero(cleanSheets),
      playedStreak: returnStatAsZero(playedStreak?.longestPlayedStreak),
    };
  });
};
