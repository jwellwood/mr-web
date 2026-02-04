import { CustomTypography } from '../../../../../../components';
import CustomSkeleton from '../../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../../components/loaders/StatSkeleton';
import { T_FETCH_TOP_PLAYER_STREAKS_QUERY } from '../../../../types';

export const rows = (
  streakType: string,
  data?: T_FETCH_TOP_PLAYER_STREAKS_QUERY['streaks'],
  loading?: boolean
) => {
  const arr = new Array(10).fill({});
  const mappedData = loading || !data?.length ? arr : data;
  return mappedData.map((item, i) => ({
    rank: loading ? <StatSkeleton /> : <CustomTypography color="data">{i + 1}</CustomTypography>,
    players: loading ? (
      <CustomSkeleton width="90px" />
    ) : (
      <CustomTypography color="data" bold>
        {item.playerName}
      </CustomTypography>
    ),
    value: loading ? <StatSkeleton /> : item[streakType as keyof typeof item],
  }));
};
