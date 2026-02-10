import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import OpponentMatchesList from '../components/player-opponents/OpponentMatchesList';
import { FETCH_PLAYER_MATCHES_BY_OPPONENT } from '../graphql';

interface Props {
  opponentId: string;
}

export default function PlayerMatchesByOpponent({ opponentId }: Props) {
  const { playerId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_PLAYER_MATCHES_BY_OPPONENT, {
    variables: { playerId: playerId!, opponentId: opponentId! },
  });

  return <OpponentMatchesList data={data} loading={loading} error={error} />;
}
