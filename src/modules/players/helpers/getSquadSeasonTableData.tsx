import CustomSkeleton from "../../../components/loaders/CustomSkeleton";
import NameCell from "../../../components/tables/NameCell";
import { returnStatAsZero } from "../../../utils/helpers/returnZero";

export const getSquadSeasonTableData = (data: {
  stats: object[];
}, loading: boolean) => {
  const arr = new Array(15).fill({});
  const dataToMap = loading
    ? arr.map((stat) => stat)
    : data?.stats?.map((stat) => stat);

  return dataToMap.map((stats) => {
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
          <NameCell id={stats._id}>
            {name || <CustomSkeleton width="90px" />}
          </NameCell>
        ),
      },
      apps: returnStatAsZero(apps),
      goals: returnStatAsZero(goals),
      goalsPerGame: returnStatAsZero(+goalsPerGame?.toFixed(2)),
      assists: returnStatAsZero(assists),
      assistsPerGame: returnStatAsZero(+assistsPerGame?.toFixed(2)),
      mvp: returnStatAsZero(mvp),
      mvpPerGame: returnStatAsZero(+mvpPerGame?.toFixed(2)),
      conceded: returnStatAsZero(conceded),
      concededPerGame: returnStatAsZero(+concededPerGame?.toFixed(2)),
      cleanSheets: returnStatAsZero(cleanSheets),
    };
  });
};
