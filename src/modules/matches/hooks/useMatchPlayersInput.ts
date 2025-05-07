import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLAYERS_BY_SEASON_ID } from 'modules/players/graphql';
import { IPlayer } from 'types';

export const useMatchPlayersInput = (teamId: string, seasonId: string) => {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  const { data, loading, error } = useQuery(GET_PLAYERS_BY_SEASON_ID, {
    variables: { teamId, seasonId },
  });

  useEffect(() => {
    if (data) {
      setPlayers(data.players);
    }
  }, [data]);

  return {
    players,
    loading,
    error,
  };
};
