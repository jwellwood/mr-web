import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FETCH_ORG_SEASON, T_FETCH_ORG_SEASON } from '../modules/seasons/graphql';
import { useCustomParams } from './useCustomParams';

export const useTeamOptions = () => {
  const { t } = useTranslation('goalscorers');
  const { orgSeasonId, orgId } = useCustomParams();
  const { data, loading, error } = useQuery<T_FETCH_ORG_SEASON>(FETCH_ORG_SEASON, {
    variables: { orgId, seasonId: orgSeasonId || 'default' },
  });

  const fetchedTeamOptions = useMemo(() => {
    if (!data?.orgSeason?.teamIds?.length) return [];
    return data.orgSeason.teamIds.map(team => ({
      label: team.teamName,
      value: team._id,
    }));
  }, [data]);

  const teamOptions = [{ label: t('FILTERS.ALL_TEAMS'), value: 'all' }, ...fetchedTeamOptions];
  return { teamOptions, loading, error };
};
