import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import PlayerView from '../components/player-overview/PlayerView';
import { FETCH_PLAYER } from '../graphql';

export default function Player() {
  const { playerId } = useCustomParams();

  const { loading, error, data } = useQuery(FETCH_PLAYER, {
    variables: { playerId: playerId! },
  });

  return <PlayerView data={data} loading={loading} error={error} />;
}
