import { useQuery } from '@apollo/client';

import { useCustomParams } from '../../../hooks';
import { FETCH_PLAYER_MOST_GOALS_ASSISTS } from '../graphql';
import PlayerMatchesWithRecordsView from '../views/PlayerMatchesWithRecordsView';

export default function PlayerMatchesWithRecords() {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER_MOST_GOALS_ASSISTS, {
    variables: { teamId, playerId },
  });

  return <PlayerMatchesWithRecordsView data={data} loading={loading} error={error} />;
}
