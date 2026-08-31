import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { ISelectOptions } from '../../../components';
import { FETCH_PLAYERS_BY_TEAM } from '../graphql';

export const useGoalscorerOptions = (teamId: string, orgSeasonId: string) => {
  const { data, loading: playersLoading } = useQuery(FETCH_PLAYERS_BY_TEAM, {
    variables: { teamId, orgSeasonId },
    skip: !teamId,
  });

  const playerOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.players) return [];
    return data?.players.map(player => ({
      value: player._id,
      label: player.name,
    }));
  }, [data]);

  return { playerOptions, playersLoading };
};
