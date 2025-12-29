import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PlayerRecordsMatchesView from '../views/PlayerRecordsMatchesView';

export default function PlayerMatchesWithMostAssists() {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_MATCHES_WITH_RECORD_ASSISTS, {
    variables: { teamId, playerId },
  });

  return (
    <PlayerRecordsMatchesView data={data?.stats} loading={loading} title="Assists" error={error} />
  );
}
