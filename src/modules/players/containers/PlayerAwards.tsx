import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import PlayerAwardsView from '../components/player-honors/PlayerAwardsView';
import { FETCH_AWARDS_BY_PLAYER } from '../graphql';

export default function PlayerAwards() {
  const { playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_AWARDS_BY_PLAYER, {
    variables: { playerId: playerId! },
  });

  return <PlayerAwardsView data={data} loading={loading} error={error} />;
}
