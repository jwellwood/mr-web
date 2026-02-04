import { CustomTypography } from '../../../../../../components';
import CustomSkeleton from '../../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../../components/loaders/StatSkeleton';
import { T_FETCH_TOP_PLAYER_STREAKS_QUERY } from '../../../../types';

export const rows = (
  data: T_FETCH_TOP_PLAYER_STREAKS_QUERY['streaks'],
  streakType: string,
  loading = false
) => {
  return data.map((item, i) => ({
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
