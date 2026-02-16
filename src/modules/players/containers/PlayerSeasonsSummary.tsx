import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import PlayerBestSeasonView from '../components/player-records/PlayerBestSeasonView';
import { FETCH_PLAYER_SEASONS_SUMMARY } from '../graphql';

export default function PlayerSeasonsSummary() {
  const { playerId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_PLAYER_SEASONS_SUMMARY, {
    variables: { playerId: playerId! },
  });

  return <PlayerBestSeasonView data={data} loading={loading} error={error} />;
}
