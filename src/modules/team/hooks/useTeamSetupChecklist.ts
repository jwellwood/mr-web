import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useCustomParams } from '../../../hooks';
import { FETCH_MATCHES } from '../../matches/graphql';
import { FETCH_PLAYER_PROFILES } from '../../squad/graphql';
import { FETCH_SEASONS } from '../../teamseasons/graphql';

export const useTeamSetupChecklist = () => {
  const { t } = useTranslation('team');
  const { teamId } = useCustomParams();

  const { data: seasonsData, loading: seasonsLoading } = useQuery(FETCH_SEASONS, {
    variables: { teamId: teamId! },
    skip: !teamId,
  });

  const { data: playersData, loading: playersLoading } = useQuery(FETCH_PLAYER_PROFILES, {
    variables: { teamId: teamId! },
    skip: !teamId,
  });

  const firstSeasonId = seasonsData?.seasons?.[0]?._id;

  const { data: matchesData, loading: matchesLoading } = useQuery(FETCH_MATCHES, {
    variables: { teamId: teamId!, seasonId: firstSeasonId ?? '' },
    skip: !teamId || !firstSeasonId,
  });

  const steps = [
    {
      label: t('CHECKLIST.STEPS.SEASON.LABEL'),
      secondary: t('CHECKLIST.STEPS.SEASON.SECONDARY', {
        value: seasonsData?.seasons?.length ?? 0,
      }),
      done: Boolean(seasonsData?.seasons?.length),
    },
    {
      label: t('CHECKLIST.STEPS.PLAYERS.LABEL'),
      secondary: t('CHECKLIST.STEPS.PLAYERS.SECONDARY', {
        value: playersData?.players?.length ?? 0,
      }),
      done: Boolean(playersData?.players?.length),
    },
    {
      label: t('CHECKLIST.STEPS.MATCHES.LABEL'),
      secondary: t('CHECKLIST.STEPS.MATCHES.SECONDARY', {
        value: matchesData?.matches?.length ?? 0,
      }),
      done: Boolean(matchesData?.matches?.length),
    },
  ];

  const loading = seasonsLoading || playersLoading || matchesLoading;

  return { steps, loading };
};
