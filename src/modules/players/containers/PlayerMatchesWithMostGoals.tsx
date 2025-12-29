import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PlayerRecordsMatchesView from '../views/PlayerRecordsMatchesView';

export default function PlayerMatchesWithMostGoals() {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_MATCHES_WITH_RECORD_GOALS, {
    variables: { teamId, playerId },
  });

  return (
    <PlayerRecordsMatchesView data={data?.stats} loading={loading} title="Goals" error={error} />
  );
}
