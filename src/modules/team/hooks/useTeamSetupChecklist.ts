import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useCustomParams } from '../../../hooks';
import { Fetch_MatchesDocument } from '../../matches/graphql/FETCH_MATCHES.generated';
import { Fetch_Player_ProfilesDocument } from '../../squad/graphql/FETCH_PLAYER_PROFILES.generated';
import { Fetch_SeasonsDocument } from '../../teamseasons/graphql/FETCH_SEASONS.generated';

export const useTeamSetupChecklist = () => {
  const { t } = useTranslation('team');
  const { teamId } = useCustomParams();

  const { data: seasonsData, loading: seasonsLoading } = useQuery(Fetch_SeasonsDocument, {
    variables: { teamId: teamId! },
    skip: !teamId,
  });

  const { data: playersData, loading: playersLoading } = useQuery(Fetch_Player_ProfilesDocument, {
    variables: { teamId: teamId! },
    skip: !teamId,
  });

  const firstSeasonId = seasonsData?.seasons?.[0]?._id;

  const { data: matchesData, loading: matchesLoading } = useQuery(Fetch_MatchesDocument, {
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

  const allDone = steps.every(step => step.done);
  const loading = seasonsLoading || playersLoading || matchesLoading;

  return { steps, allDone, loading };
};
