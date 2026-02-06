import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_ALL_TIME_STATS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchStatsAllTimeView from '../components/matches-stats/MatchStatsAllTimeView';
import { useMatchStatsFilters } from '../context';

export default function MatchStatsAllTime() {
  const { filters } = useMatchStatsFilters();
  const { teamId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_MATCHES_ALL_TIME_STATS, {
    variables: {
      teamId: teamId!,
      competitionId: filters.competition,
      includeForfeits: filters.includeForfeits,
    },
  });

  return <MatchStatsAllTimeView data={data} loading={loading} error={error} />;
}
