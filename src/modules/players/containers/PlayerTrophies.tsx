import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import PlayerTrophiesView from '../components/player-honors/PlayerTrophiesView';
import { FETCH_PLAYER_TROPHIES } from '../graphql';

export default function PlayerTrophies() {
  const { playerId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_PLAYER_TROPHIES, {
    variables: { playerId: playerId! },
  });

  return <PlayerTrophiesView data={data} loading={loading} error={error} />;
}
