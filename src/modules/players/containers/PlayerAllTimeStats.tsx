import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useCustomParams } from '../../../hooks/useCustomParams';
import Averages from '../../../modules/matches/components/Averages';
import MatchStatsTable from '../../../modules/matches/components/MatchStatsTable';
import { IMatchStats } from '../../../types';
import GamesWithStat from '../components/GamesWithStat';
import PlayerStatsTable from '../components/PlayerStatsTable';
import { GET_PLAYER_ALL_TIME_STATS } from '../graphql';
import { mapPlayerAverages } from '../helpers/mapPlayerAverages';
import { mapPlayerMatchStats } from '../helpers/mapPlayerMatchStats';

const PlayerAllTimeStats: React.FC = () => {
  const { playerId } = useCustomParams();

  const { loading, data, refetch } = useQuery(GET_PLAYER_ALL_TIME_STATS, {
    variables: { playerId },
  });

  useEffect(() => {
    refetch();
  }, [playerId, refetch]);

  const player = data?.player;
  if (!player) {
    return null;
  }
  return (
    <>
      <MatchStatsTable
        stats={mapPlayerMatchStats(player, loading) as unknown as IMatchStats}
        loading={loading}
      />
      <Averages stats={mapPlayerAverages(player)} loading={loading} />
      <PlayerStatsTable stats={player} loading={loading} />
      <GamesWithStat player={player} loading={loading} />
    </>
  );
};

export default PlayerAllTimeStats;
