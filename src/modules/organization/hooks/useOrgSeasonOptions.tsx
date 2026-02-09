import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type { ISelectOptions } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_SEASONS } from '../graphql';

export const useOrgSeasonOptions = () => {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_SEASONS, {
    variables: { orgId },
  });

  const orgSeasonOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.orgSeasons?.length) return [];
    return data.orgSeasons.map(season => ({
      value: season._id,
      label: season.name,
    })) as ISelectOptions[];
  }, [data]);

  return { orgSeasonOptions, loading, error };
};
