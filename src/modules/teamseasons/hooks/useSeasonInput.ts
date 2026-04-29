import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import type { ISelectOptions } from '../../../components';
import { emptySelectOption } from '../../../constants/rounds';
import { FETCH_ORG } from '../../organization/graphql';
import { FETCH_ORG_SEASONS } from '../../seasons/graphql';

export const useSeasonInput = (orgId?: string) => {
  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] =
    useLazyQuery(FETCH_ORG);

  const [getOrgSeasons, { data: orgSeasonsData }] = useLazyQuery(FETCH_ORG_SEASONS);

  useEffect(() => {
    if (orgId) {
      getOrgById({ variables: { orgId: orgId! } });
      getOrgSeasons({ variables: { orgId: orgId! } });
    }
  }, [getOrgById, getOrgSeasons, orgId]);

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

  const orgSeasonOptions = useMemo<ISelectOptions[]>(() => {
    const orgSeasons = orgSeasonsData?.orgSeasons ?? [];
    if (!orgSeasons.length) return [emptySelectOption as ISelectOptions];
    return [
      emptySelectOption,
      ...orgSeasons.map(season => ({ label: season.name, value: season._id })),
    ] as ISelectOptions[];
  }, [orgSeasonsData]);

  return {
    competitionOptions,
    orgSeasonOptions,
    orgError,
    orgLoading,
  };
};
