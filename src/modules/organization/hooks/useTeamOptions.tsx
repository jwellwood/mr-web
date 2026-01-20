import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { useCustomParams } from '../../../hooks';
import type { ISelectOptions } from '../../../components';
import { FETCH_ORG_TEAMS } from '../graphql';

export const useTeamOptions = () => {
  const { orgId } = useCustomParams();
  const [teamOptions, setTeamOptions] = useState<ISelectOptions[]>([]);

  const { data, error, loading } = useQuery(FETCH_ORG_TEAMS, {
    variables: { orgId },
  });

  useEffect(() => {
    if (error) {
      setTeamOptions([]);
    }
    if (data?.teams.length) {
      const teams = data.teams.map(team => {
        return {
          value: team._id,
          label: team.teamName,
        };
      }) as ISelectOptions[];
      setTeamOptions(teams);
    }
  }, [data, error]);

  return { teamOptions, loading };
};
