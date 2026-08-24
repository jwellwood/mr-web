import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_SEASON, T_FETCH_ORG_SEASON } from '../../seasons/graphql';

export default function useCompetitionConfig(orgSeasonId?: string) {
  const { orgSeasonId: paramsOrgSeasonId, orgId } = useCustomParams();
  const { data, loading, error } = useQuery<T_FETCH_ORG_SEASON>(FETCH_ORG_SEASON, {
    variables: { orgId, seasonId: orgSeasonId || paramsOrgSeasonId || 'default' },
  });

  const competitionConfig = data?.orgSeason?.competitionConfigs?.map(c => ({
    ...c,
    id: c.competitionId?._id ?? c.competitionId?.name ?? 'other',
    name: c.competitionId?.name ?? 'Other',
    priority: c.priority ?? 99,
  }));

  return { competitionConfig, loading, error };
}
