import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import type { ISelectOptions } from '../components';
import { FETCH_ORG } from '../modules/organization/graphql';
import { ICompetition } from '../modules/organization/types';
import { useCustomParams, useSeasons } from '.';

export const useStatsFilters = () => {
  const { orgId } = useCustomParams();

  const { loading: loadingSeasons, seasonOptions } = useSeasons();

  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] =
    useLazyQuery(FETCH_ORG);

  useEffect(() => {
    if (orgId) {
      getOrgById({ variables: { orgId } });
    }
  }, [getOrgById, orgId]);

  const competitionOptions = useMemo<ISelectOptions[]>(() => {
    if (!orgData?.org?.competitions?.length) return [];
    return orgData.org.competitions.map((comp: ICompetition) => ({
      label: comp.name,
      value: comp._id,
    })) as ISelectOptions[];
  }, [orgData]);

  const loading = loadingSeasons || orgLoading;
  const error = orgError;

  return {
    seasonOptions: [{ label: 'All', value: 'all' }, ...seasonOptions],
    competitionOptions: [{ label: 'All', value: 'all' }, ...competitionOptions],
    loading,
    error,
  };
};
