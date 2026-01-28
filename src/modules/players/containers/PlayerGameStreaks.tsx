import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_STREAKS } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PlayerGameStreaksView from '../components/player-records/player-streaks/PlayerGameStreaksView';

export default function PlayerGameStreaks() {
  const { playerId, teamId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_PLAYER_STREAKS, {
    variables: { playerId: playerId!, teamId: teamId! },
  });

  return <PlayerGameStreaksView data={data} loading={loading} error={error} />;
}
