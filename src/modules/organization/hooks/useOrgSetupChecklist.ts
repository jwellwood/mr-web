import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useCustomParams } from '../../../hooks';
import { FETCH_RESULTS } from '../../results/graphql';
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
    variables: { seasonId: currentSeason?._id ?? '' },
    skip: !currentSeason?._id,
  });

  const { data: resultsData, loading: resultsLoading } = useQuery(FETCH_RESULTS, {
    variables: { orgId: orgId!, orgSeasonId: currentSeason?._id ?? '' },
    skip: !orgId || !currentSeason?._id,
  });

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
        value: seasonData?.orgSeason?.competitionConfigs?.length || 0,
      }),
      done: Boolean(
        seasonData?.orgSeason?.competitionConfigs?.some(config =>
          orgData?.org?.competitions?.some(comp => comp._id === config.competitionId?._id)
        )
      ),
    },
    {
      label: t('CHECKLIST.STEPS.RESULTS.LABEL'),
      secondary: t('CHECKLIST.STEPS.RESULTS.SECONDARY', {
        value: resultsData?.results?.length || 0,
      }),
      done: Boolean(resultsData?.results?.length),
    },
  ];

  const allDone = steps.every(step => step.done);
  const isLoading = orgLoading || teamsLoading || seasonsLoading || seasonLoading || resultsLoading;
  return { steps, allDone, loading: isLoading };
};
