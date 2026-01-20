import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApolloError, useMutation, useQuery } from '@apollo/client';

import { EDIT_MATCH, FETCH_MATCHES, FETCH_MATCH, FETCH_MATCHES_STATS } from '../graphql';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql';
import MatchFormStepper from './components/MatchFormStepper';
import { PAGES } from '../constants';
import { mapMatch } from '../helpers';
import { mapMatchResponseToTempMatch } from '../helpers/mapMatchResponseToTempMatch';
import { useMatchDetailsInput } from '../hooks/useMatchDetailsInput';
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
import RouteGuard from '../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import { IPlayerInMatch, ITempMatch } from '../types';
import { DataError, PageHeader } from '../../../components';

export default function EditMatch() {
  const { teamId, matchId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ITempMatch | null>(null);
  const [currentPlayers, setCurrentPlayers] = useState<IPlayerInMatch[]>([]);

  const { data, loading, error } = useQuery(FETCH_MATCH, {
    variables: { matchId },
  });

  const currentTempMatch = useSelector(getTempMatch);
  const currentTempPlayers = useSelector(getTempPlayers);

  const { opponents, competitions, seasonOptions } = useMatchDetailsInput();

  const [editMatch, { error: editError, loading: editLoading }] = useMutation(EDIT_MATCH, {
    refetchQueries: [
      {
        query: FETCH_MATCHES,
        variables: {
          limit: 5,
          offset: 0,
          teamId,
          seasonId: currentTempMatch.seasonId,
        },
      },
      {
        query: FETCH_SQUAD_LIST_BY_SEASON,
        variables: { teamId, seasonId: currentTempMatch.seasonId },
      },
      {
        query: FETCH_MATCHES_STATS,
        variables: { teamId, seasonId: currentTempMatch.seasonId },
      },
      {
        query: FETCH_MATCH,
        variables: { matchId },
      },
    ],
  });

  useEffect(() => {
    if (data?.match) {
      dispatch(setTmpMatch(mapMatchResponseToTempMatch(data.match)));
      dispatch(setTmpPlayers({ players: data.match?.matchPlayers as IPlayerInMatch[] }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    setDefaultValues(currentTempMatch);
  }, [currentTempMatch]);

  useEffect(() => {
    setCurrentPlayers(currentTempPlayers);
  }, [currentTempPlayers]);

  const onSubmit = () => {
    if (!teamId) {
      console.error('Missing team id');
      return;
    }
    const data = mapMatch(teamId, currentTempMatch, currentTempPlayers);
    editMatch({ variables: { matchId, ...data } })
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
    const hasValues = defaultValues?._id && currentPlayers;
    const hasOptions = competitions.length && seasonOptions.length && opponents.length;
    return !isLoading && hasValues && hasOptions ? (
      <MatchFormStepper
        defaultValues={defaultValues}
        currentPlayers={currentPlayers}
        teamId={teamId as string}
        seasonOptions={seasonOptions}
        opponents={opponents}
        competitions={competitions}
        onSubmit={onSubmit}
        loading={isLoading}
      />
    ) : (
      <Spinner />
    );
  };

  const hasError = error || editError;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_MATCH}>
        {hasError ? <DataError error={error || (editError as ApolloError)} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
