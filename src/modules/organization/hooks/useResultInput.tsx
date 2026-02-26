import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import type { ISelectOptions } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { getNumberOptions } from '../../../utils';
import { FETCH_ORG_SEASON } from '../org-seasons/graphql';

export const useTeamOptions = () => {
  const { orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
  });

  const teamOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.orgSeason.teamIds?.length) return [];
    return data.orgSeason.teamIds.map(team => ({
      value: team._id,
      label: team.teamName,
    })) as ISelectOptions[];
  }, [data]);

  const roundOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.orgSeason?.competitionConfigs?.[0]?.rounds) return [];
    return getNumberOptions(data?.orgSeason?.competitionConfigs[0]?.rounds || 0).map(option => ({
      value: option.value,
      label: `Round ${option.label}`,
    }));
  }, [data]);

  return { teamOptions, roundOptions, loading, error };
};
