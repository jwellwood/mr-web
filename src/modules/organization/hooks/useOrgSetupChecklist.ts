import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../../seasons/graphql';
import { FETCH_ORG, FETCH_ORG_TEAMS } from '../graphql';

export const useOrgSetupChecklist = () => {
  const { t } = useTranslation('organization');
  const { orgId } = useCustomParams();

  const { data: orgData, loading: orgLoading } = useQuery(FETCH_ORG, {
    variables: { orgId: orgId! },
    skip: !orgId,
  });

  const { data: teamsData, loading: teamsLoading } = useQuery(FETCH_ORG_TEAMS, {
    variables: { orgId: orgId! },
    skip: !orgId,
  });

  const { data: seasonsData, loading: seasonsLoading } = useQuery(FETCH_ORG_SEASONS, {
    variables: { orgId: orgId! },
    skip: !orgId,
  });

  const currentSeason = seasonsData?.orgSeasons?.find(season => season.isCurrent);

  const { data: seasonData, loading: seasonLoading } = useQuery(FETCH_ORG_SEASON, {
    variables: { orgId: orgId!, seasonId: currentSeason?._id ?? '' },
    skip: !currentSeason?._id,
  });

  const validConfigs = seasonData?.orgSeason?.competitionConfigs?.filter(
    config => config.rounds && config.teams && config?.teams?.length > 0
  );

  const steps = [
    {
      label: t('CHECKLIST.STEPS.COMPETITION.LABEL'),
      secondary: t('CHECKLIST.STEPS.COMPETITION.SECONDARY', {
        value: orgData?.org?.competitions?.length,
      }),
      done: Boolean(orgData?.org?.competitions?.length),
    },
    {
      label: t('CHECKLIST.STEPS.ACTIVE_TEAMS.LABEL'),
      secondary: t('CHECKLIST.STEPS.ACTIVE_TEAMS.SECONDARY', {
        value: teamsData?.teams?.filter(team => team.isActive).length,
      }),
      done: Boolean(teamsData?.teams?.some(team => team.isActive)),
    },
    {
      label: t('CHECKLIST.STEPS.CURRENT_SEASON.LABEL'),
      secondary: t('CHECKLIST.STEPS.CURRENT_SEASON.SECONDARY', {
        value: currentSeason?.name || 0,
      }),
      done: Boolean(currentSeason),
    },
    {
      label: t('CHECKLIST.STEPS.COMP_CONFIG.LABEL'),
      secondary: t('CHECKLIST.STEPS.COMP_CONFIG.SECONDARY', {
        value: validConfigs?.length || 0,
        total: seasonData?.orgSeason?.competitionConfigs?.length || 0,
      }),
      done: Boolean(validConfigs?.length === seasonData?.orgSeason?.competitionConfigs?.length),
    },
  ];

  const isLoading = orgLoading || teamsLoading || seasonsLoading || seasonLoading;
  return { steps, loading: isLoading };
};
