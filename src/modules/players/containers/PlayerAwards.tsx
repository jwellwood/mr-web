import { useQuery } from '@apollo/client';

import { FETCH_AWARDS_BY_PLAYER } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PlayerAwardsView from '../views/PlayerAwardsView';

export default function PlayerAwards() {
  const { playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_AWARDS_BY_PLAYER, {
    variables: { playerId },
  });

  return <PlayerAwardsView data={data} loading={loading} error={error} />;
}
