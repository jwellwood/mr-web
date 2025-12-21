import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_STATS_ALL_TIME, FETCH_SQUAD_STREAKS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SquadAllTimeStatsView from '../views/SquadAllTimeStatsView';

export default function SquadStatsAllTime() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_STATS_ALL_TIME, {
    variables: { teamId },
  });
  const {
    data: streaks,
    loading: streaksLoading,
    error: streaksError,
  } = useQuery(FETCH_SQUAD_STREAKS, {
    variables: { teamId },
  });

  return (
    <SquadAllTimeStatsView
      loading={loading || streaksLoading}
      error={error || streaksError}
      data={data}
      streaks={streaks}
    />
  );
}
