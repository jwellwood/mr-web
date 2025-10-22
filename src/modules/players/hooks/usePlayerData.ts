import { useQuery } from '@apollo/client';
import { IPlayer } from '../../../types';
import { FETCH_PLAYER } from '../graphql';

export const usePlayerData = (playerId?: string): { loading: boolean; data: Partial<IPlayer> } => {
  const { loading, data } = useQuery(FETCH_PLAYER, {
    variables: { playerId },
  });
  return { loading, data: data?.player || {} };
};
