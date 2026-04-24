import RecordPlayers from '../../../components/squad-records/RecordPlayers';
import { T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../../graphql';

type StatsObj = NonNullable<T_FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY['stats']>;
type StatArray = NonNullable<StatsObj[keyof StatsObj]>;

export const rows = (stats?: StatArray | null) => {
  const sortedStats = stats || [];
  return sortedStats.map((item, i) => {
    return {
      rank: i + 1,
      names: <RecordPlayers names={item?.player ? [item.player] : []} />,
      season: item?.season?.name,
      value: item?.value,
    };
  });
};
