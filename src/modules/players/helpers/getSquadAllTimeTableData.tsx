import CustomSkeleton from "../../../components/loaders/CustomSkeleton";
import NameCell from "../../../components/tables/NameCell";
import {returnStatAsZero} from "../../../utils/helpers/returnZero.tsx";

export const getSquadAllTimeTableData = (data: {
  stats: object[];
}, loading: boolean) => {
  const arr = new Array(15).fill({});
  const dataToMap = loading
    ? arr.map((stat) => stat)
    : data?.stats?.map((stat) => stat);

  return dataToMap.map((stats) => {
    const { name, apps, goals, assists, mvp, conceded, cleanSheets } =
      stats || {};
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
      assists: returnStatAsZero(assists),
      mvp: returnStatAsZero(mvp),
      conceded: returnStatAsZero(conceded),
      cleanSheets: returnStatAsZero(cleanSheets),
    };
  });
};
