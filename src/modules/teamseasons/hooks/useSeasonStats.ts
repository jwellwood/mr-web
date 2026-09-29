import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_MATCHES_STATS } from '../../matches/graphql';

export const useSeasonStats = (seasonId: string, competitionId: string) => {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_MATCHES_STATS, {
    skip: !teamId || !seasonId || !competitionId,
    variables: {
      teamId: teamId!,
      seasonId: seasonId!,
      competitionId: competitionId,
      includeForfeits: true,
    },
  });

  return { data, loading, error };
};
