import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_ALL_TIME_STATS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchStatsAllTimeView from '../views/MatchStatsAllTimeView';

export default function MatchStatsAllTime() {
  const { teamId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_MATCHES_ALL_TIME_STATS, {
    variables: { teamId },
  });

  return <MatchStatsAllTimeView data={data} loading={loading} error={error} />;
}
