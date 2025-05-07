import { useQuery } from '@apollo/client';
import { IPlayer } from 'types';
import { GET_PLAYER_BY_ID } from '../graphql';

export const usePlayerData = (
  playerId: string
): { loading: boolean; data: Partial<IPlayer> } => {
  const { loading, data } = useQuery(GET_PLAYER_BY_ID, {
    variables: { playerId },
  });
  return { loading, data: data?.player };
};
