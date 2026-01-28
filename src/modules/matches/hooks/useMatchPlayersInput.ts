import { useQuery } from '@apollo/client';
import { FETCH_PLAYERS_FOR_MATCH_INPUT } from '../graphql';

export const useMatchPlayersInput = (teamId: string | undefined, seasonId: string | undefined) => {
  const { data, loading, error } = useQuery(FETCH_PLAYERS_FOR_MATCH_INPUT, {
    variables: { teamId: teamId!, seasonId: seasonId! },
  });

  return {
    players: data ? data.players : [],
    loading,
    error,
  };
};
