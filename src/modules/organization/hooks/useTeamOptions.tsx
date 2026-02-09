import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type { ISelectOptions } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_TEAMS } from '../graphql';

export const useTeamOptions = () => {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_TEAMS, {
    variables: { orgId },
  });

  const teamOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.teams?.length) return [];
    return data.teams.map(team => ({ value: team._id, label: team.teamName })) as ISelectOptions[];
  }, [data]);

  return { teamOptions, loading, error };
};
