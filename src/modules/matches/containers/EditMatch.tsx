import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import {
  AppDispatch,
  getTempMatch,
  getTempPlayers,
  resetTmpMatch,
  resetTmpPlayers,
  setTmpPlayers,
  setTmpMatch,
  showAlert,
} from '../../../store';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql';
import {
  mapFetchedMatchToTempMatch,
  mapFetchedPlayersToTempPlayers,
  mapTempMatchToMutation,
} from '../forms/mappers';
import { EDIT_MATCH, FETCH_MATCHES, FETCH_MATCH, FETCH_MATCHES_STATS } from '../graphql';
import { useMatchDetailsInput } from '../hooks/useMatchDetailsInput';
import EditMatchPage from '../pages/EditMatchPage';
import { ITempMatch, ITempMatchPlayers } from '../types';

export default function EditMatch() {
  const { t } = useTranslation('matches');
  const { teamId, matchId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const currentTempMatch = useSelector(getTempMatch);
  const currentTempPlayers = useSelector(getTempPlayers);

  const defaultValues: ITempMatch | null = useMemo(
    () => currentTempMatch || null,
    [currentTempMatch]
  );
  const currentPlayers: ITempMatchPlayers[] = useMemo(
    () => currentTempPlayers || [],
    [currentTempPlayers]
  );

  const { data, loading, error } = useQuery(FETCH_MATCH, {
    variables: { matchId: matchId! },
  });

  const { opponents, competitions, seasonOptions } = useMatchDetailsInput();

  const [editMatch, { error: editError, loading: editLoading }] = useMutation(EDIT_MATCH, {
    refetchQueries: [
      {
        query: FETCH_MATCHES,
        variables: { teamId: teamId!, seasonId: currentTempMatch.seasonId },
      },
      {
        query: FETCH_SQUAD_LIST_BY_SEASON,
        variables: { teamId: teamId!, seasonId: currentTempMatch.seasonId },
      },
      {
        query: FETCH_MATCHES_STATS,
        variables: { teamId: teamId!, seasonId: currentTempMatch.seasonId },
      },
      {
        query: FETCH_MATCH,
        variables: { matchId },
      },
    ],
    onError: err => {
      dispatch(showAlert({ text: err.message, type: 'error' }));
      console.error('Edit match error', err);
    },
  });

  useEffect(() => {
    if (data?.match) {
      dispatch(setTmpMatch(mapFetchedMatchToTempMatch(data.match)));
      dispatch(
        setTmpPlayers({ matchPlayers: mapFetchedPlayersToTempPlayers(data.match.matchPlayers) })
      );
    }
  }, [data, dispatch]);

  const onSubmit = () => {
    if (!teamId) {
      console.error('Missing team id');
      return;
    }
    const data = mapTempMatchToMutation(teamId, currentTempMatch, currentTempPlayers);
    editMatch({ variables: { matchId: matchId!, ...data } })
      .then(() => {
        dispatch(showAlert({ text: t('ALERTS.EDIT_MATCH.SUCCESS'), type: 'success' }));
        dispatch(resetTmpMatch());
        dispatch(resetTmpPlayers());
        navigate(-1);
      })
      .catch(err => {
        dispatch(showAlert({ text: t('ALERTS.EDIT_MATCH.ERROR'), type: 'error' }));
        console.error(err);
      });
  };

  const isLoading = loading || editLoading;
  const hasValues = !!defaultValues && !!currentPlayers;
  const hasOptions = !!competitions.length && !!seasonOptions.length && !!opponents.length;
  const ready = !isLoading && hasValues && hasOptions;
  const combinedError = error || editError;

  return (
    <EditMatchPage onSubmit={onSubmit} ready={ready} loading={isLoading} error={combinedError} />
  );
}
