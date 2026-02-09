import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
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
import { PAGES } from '../constants';
import { EDIT_MATCH, FETCH_MATCHES, FETCH_MATCH, FETCH_MATCHES_STATS } from '../graphql';
import { useMatchDetailsInput } from '../hooks/useMatchDetailsInput';
import { ITempMatch, ITempMatchPlayers } from '../types';
import MatchFormStepper from './components/MatchFormStepper';
import {
  mapFetchedMatchToTempMatch,
  mapFetchedPlayersToTempPlayers,
  mapTempMatchToMutation,
} from './mappers';

export default function EditMatch() {
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
        variables: {
          limit: 5,
          offset: 0,
          teamId: teamId!,
          seasonId: currentTempMatch.seasonId,
        },
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
        dispatch(showAlert({ text: 'Match updated successfully!', type: 'success' }));
        dispatch(resetTmpMatch());
        dispatch(resetTmpPlayers());
        navigate(-1);
      })
      .catch(err => {
        dispatch(showAlert({ text: 'Failed to update match.', type: 'error' }));
        console.error(err);
      });
  };

  const renderContent = () => {
    const isLoading = loading && editLoading;
    const hasValues = defaultValues && currentPlayers;
    const hasOptions = competitions.length && seasonOptions.length && opponents.length;
    return !isLoading && hasValues && hasOptions ? (
      <MatchFormStepper onSubmit={onSubmit} loading={isLoading} error={error || editError} />
    ) : (
      <Spinner />
    );
  };

  const hasError = error || editError;

  return (
    <PageHeader title={PAGES.EDIT_MATCH}>
      {hasError ? <DataError error={error || (editError as ApolloError)} /> : renderContent()}
    </PageHeader>
  );
}
