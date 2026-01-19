import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import RecordPlayers from '../../RecordPlayers';

export const rows = (
  data?: { value: number; names: { id: string; name: string }[] }[],
  loading?: boolean
) => {
  const arr = new Array(5).fill({});
  const mappedData = loading || !data?.length ? arr : data?.map(item => item);

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
