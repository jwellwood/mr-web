import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_SEASON, T_FETCH_ORG_SEASON } from '../../seasons/graphql';

export default function useCompetitionConfig() {
  const { orgSeasonId } = useCustomParams();
  const { data, loading, error } = useQuery<T_FETCH_ORG_SEASON>(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId || 'default' },
    skip: !orgSeasonId,
  });

  const competitionConfig = data?.orgSeason?.competitionConfigs?.map(c => ({
    id: c.competitionId?._id ?? c.competitionId?.name ?? 'other',
    name: c.competitionId?.name ?? 'Other',
    priority: c.priority ?? Number.MAX_SAFE_INTEGER,
  }));

  return { competitionConfig, loading, error };
}
