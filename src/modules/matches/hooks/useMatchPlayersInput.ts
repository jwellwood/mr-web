import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { IPlayer } from '../../../types';
import { GET_PLAYERS_BY_SEASON_ID } from '../../players/graphql';

export const useMatchPlayersInput = (teamId: string | undefined, seasonId: string | undefined) => {
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
