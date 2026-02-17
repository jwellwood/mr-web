import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import type { ISelectOptions } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { FETCH_COMPETITIONS } from '../competitions/graphql';

export const useCompetitionOptions = () => {
  const { orgId } = useCustomParams();

  const { data, error, loading } = useQuery(FETCH_COMPETITIONS, {
    variables: { orgId: orgId! },
  });

  const competitionOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.org?.competitions?.length) return [];
    return data.org.competitions.map(comp => ({
      value: comp._id,
      label: comp.name,
    })) as ISelectOptions[];
  }, [data]);

  return { competitionOptions, loading, error };
};
