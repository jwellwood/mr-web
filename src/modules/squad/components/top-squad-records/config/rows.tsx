import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import RecordPlayers from '../../RecordPlayers';
import { FETCH_SQUAD_RECORDS_QUERY } from '../../../types';

type StatsObj = NonNullable<FETCH_SQUAD_RECORDS_QUERY['stats']>;
type StatArray = NonNullable<StatsObj[keyof StatsObj]>;

export const rows = (stats?: StatArray | null, loading?: boolean) => {
  const arr = new Array(5).fill({});
  const mappedData = loading || !stats?.length ? arr : stats?.map(item => item);

  return mappedData.map((item, i) => {
    const { value } = item || { names: [] };
    return {
      rank: loading ? <StatSkeleton /> : i + 1,
      names: loading ? (
        <CustomSkeleton width="100px" />
      ) : (
        <RecordPlayers names={item?.names} loading={loading} />
      ),
      value: loading ? <StatSkeleton /> : value,
    };
  });
};
