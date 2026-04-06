import { useLazyQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ISelectOptions } from '../components';
import { FETCH_ORG } from '../modules/organization/graphql';
import { useCustomParams, useSeasons } from '.';

export const useStatsFilters = () => {
  const { t } = useTranslation('squad');

  const { orgId } = useCustomParams();

  const { loading: loadingSeasons, seasonOptions } = useSeasons();

  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] =
    useLazyQuery(FETCH_ORG);

  useEffect(() => {
    if (orgId) {
      getOrgById({ variables: { orgId: orgId! } });
    }
  }, [getOrgById, orgId]);

  const competitionOptions = useMemo<ISelectOptions[]>(() => {
    if (!orgData?.org?.competitions?.length) return [];
    return orgData.org.competitions.map(comp => ({
      label: comp.name,
      value: comp._id,
    })) as ISelectOptions[];
  }, [orgData]);

  const loading = loadingSeasons || orgLoading;
  const error = orgError;

  return {
    seasonOptions: [{ label: t('FILTERS.ALL_SEASONS'), value: 'all' }, ...seasonOptions],
    competitionOptions: [
      { label: t('FILTERS.ALL_COMPETITIONS'), value: 'all' },
      ...competitionOptions,
    ],
    loading,
    error,
  };
};
