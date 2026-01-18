import { useQuery } from '@apollo/client';

import { useCustomParams } from '../../../hooks';
import { FETCH_PLAYER_MATCH_RECORDS } from '../graphql';
import PlayerMatchesWithRecordsView from '../views/PlayerMatchesWithRecordsView';

export default function PlayerMatchesRecords() {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_MATCH_RECORDS, {
    variables: { teamId, playerId },
  });

  return <PlayerMatchesWithRecordsView data={data} loading={loading} error={error} />;
}
