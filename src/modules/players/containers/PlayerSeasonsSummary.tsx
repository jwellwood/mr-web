import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_SEASONS_SUMMARY } from '../graphql';
import { useCustomParams } from '../../../hooks';
import PlayerBestSeasonView from '../views/PlayerBestSeasonView';

export default function PlayerSeasonsSummary() {
  const { playerId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_PLAYER_SEASONS_SUMMARY, {
    variables: { playerId },
  });

  return <PlayerBestSeasonView data={data} loading={loading} error={error} />;
}
