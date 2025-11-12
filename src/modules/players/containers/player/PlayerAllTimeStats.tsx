import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_ALL_TIME_STATS } from '../../graphql';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import Averages from '../../../matches/components/Averages';
import MatchStatsTable from '../../../matches/components/MatchStatsTable';
import GamesWithStat from '../../components/GamesWithStat';
import PlayerStatsTable from '../../components/PlayerStatsTable';
import { mapPlayerAverages } from '../../helpers/mapPlayerAverages';
import { mapPlayerMatchStats } from '../../helpers/mapPlayerMatchStats';
import PlayerGameStreaks from './PlayerGameStreaks';
import ErrorGraphql from '../../../../errors/ErrorGraphql';
import { IPlayerStats } from '../../types';
import { IMatchStats } from '../../../matches/types';

export default function PlayerAllTimeStats() {
  const { playerId } = useCustomParams();

  const { loading, data, refetch, error } = useQuery(FETCH_PLAYER_ALL_TIME_STATS, {
    variables: { playerId },
  });

  useEffect(() => {
    refetch();
  }, [playerId, refetch]);

  const player = data?.player[0] || ({} as IPlayerStats);

  return error ? (
    <ErrorGraphql error={error} />
  ) : (
    <>
      <MatchStatsTable stats={mapPlayerMatchStats(player, loading) as unknown as IMatchStats} />
      <Averages stats={mapPlayerAverages(player)} loading={loading} />
      <PlayerStatsTable stats={player} loading={loading} />
      <GamesWithStat player={player} loading={loading} />
      <PlayerGameStreaks />
    </>
  );
}
