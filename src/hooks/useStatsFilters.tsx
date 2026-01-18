import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useCustomParams, useSeasons } from '.';
import { ICompetition } from '../modules/organization/types';
import { FETCH_ORG } from '../modules/organization/graphql';
import { ISelectOptions } from '../components/inputs/SelectInput';

export const useStatsFilters = () => {
  const { orgId } = useCustomParams();

  const [competitionOptions, setCompetitionOptions] = useState<ISelectOptions[]>([]);
  const { loading: loadingSeasons, seasonOptions } = useSeasons();

  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] = useLazyQuery(
    FETCH_ORG,
    { variables: { orgId } }
  );

  useEffect(() => {
    if (orgId) {
      getOrgById();
    }
  }, [getOrgById, orgId]);

  useEffect(() => {
    if (orgData) {
      const compOptions = orgData.org.competitions.map((comp: ICompetition) => ({
        label: comp.name,
        value: comp._id,
      }));
      setCompetitionOptions(compOptions as ISelectOptions[]);
    }
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
