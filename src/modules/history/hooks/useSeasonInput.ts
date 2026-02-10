import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import type { ISelectOptions } from '../../../components';
import { emptySelectOption } from '../../../constants/rounds';
import { FETCH_ORG } from '../../organization/graphql';

export const useSeasonInput = (orgId?: string) => {
  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] =
    useLazyQuery(FETCH_ORG);

  useEffect(() => {
    if (orgId) {
      getOrgById({ variables: { orgId } });
    }
  }, [getOrgById, orgId]);

  const competitionOptions = useMemo<ISelectOptions[]>(() => {
    const competitions = orgData?.org?.competitions ?? [];
    if (!competitions?.length) return [];
    return [
      emptySelectOption,
      ...competitions
        .filter(comp => comp.competitionType === 'League')
        .map(competition => ({ label: competition.name, value: competition.name })),
    ] as ISelectOptions[];
  }, [orgData]);

  return {
    competitionOptions,
    orgError,
    orgLoading,
  };
};
