import RecordPlayers from '../../../components/squad-records/RecordPlayers';
import { T_FETCH_SQUAD_RECORDS_QUERY } from '../../../graphql';

type StatsObj = NonNullable<T_FETCH_SQUAD_RECORDS_QUERY['stats']>;
type StatArray = NonNullable<StatsObj[keyof StatsObj]>;

export const rows = (stats?: StatArray | null) => {
  const sortedStats = stats || [];
  return sortedStats.map((item, i) => {
    const { value } = item || { names: [] };
    return {
      rank: i + 1,
      names: <RecordPlayers names={item?.names} />,
      value: value,
    };
  });
};
