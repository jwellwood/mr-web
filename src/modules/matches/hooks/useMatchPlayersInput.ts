import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_SQUAD_BY_SEASON } from '../../squad/graphql';
import { IPlayer } from '../../players/types';

export const useMatchPlayersInput = (teamId: string | undefined, seasonId: string | undefined) => {
  const [players, setPlayers] = useState<IPlayer[]>([]);

  const { data, loading, error } = useQuery(FETCH_SQUAD_BY_SEASON, {
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
