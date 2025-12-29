import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_STREAKS } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PlayerGameStreaksView from '../views/PlayerGameStreaksView';

export default function PlayerGameStreaks() {
  const { playerId, teamId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_PLAYER_STREAKS, {
    variables: { playerId, teamId },
  });

  return <PlayerGameStreaksView data={data} loading={loading} error={error} />;
}
