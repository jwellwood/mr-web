import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_PLAYER_SEASON_STATS } from '../../graphql';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { useSeasons } from '../../../../hooks/useSeasons';
import Averages from '../../../matches/components/Averages';
import MatchStatsTable from '../../../matches/components/MatchStatsTable';
import SelectSeason from '../../../team/containers/SelectSeason';
import { IMatchStats, IPlayerStats } from '../../../../types';
import GamesWithStat from '../../components/GamesWithStat';
import PlayerStatsTable from '../../components/PlayerStatsTable';
import { mapPlayerAverages } from '../../helpers/mapPlayerAverages';
import { mapPlayerMatchStats } from '../../helpers/mapPlayerMatchStats';
import ErrorGraphql from '../../../../errors/ErrorGraphql';

export default function PlayerSeasonStats() {
  const { seasonId } = useSeasons();
  const { playerId } = useCustomParams();

  const { loading, data, refetch, error } = useQuery(FETCH_PLAYER_SEASON_STATS, {
    variables: { seasonId, playerId },
    skip: !seasonId,
    refetchWritePolicy: 'overwrite',
  });

  useEffect(() => {
    refetch();
  }, [playerId, refetch, seasonId]);

  const player = data?.player[0] || ({} as IPlayerStats);

  const renderContent = () => {
    return (
      <>
        <SelectSeason playerId={playerId} />
        <MatchStatsTable stats={mapPlayerMatchStats(player, loading) as unknown as IMatchStats} />
        <Averages stats={mapPlayerAverages(player)} loading={loading} />
        <PlayerStatsTable stats={player} loading={loading} />
        <GamesWithStat player={player} loading={loading} />
      </>
    );
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
