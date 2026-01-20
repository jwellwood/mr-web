import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MATCH, FETCH_MATCHES, FETCH_MATCHES_STATS } from '../graphql';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql/';
import { PAGES } from '../constants';
import { mapMatch } from '../helpers';
import { useMatchDetailsInput } from '../hooks/useMatchDetailsInput';
import { useCustomParams } from '../../../hooks/useCustomParams';
import {
  AppDispatch,
  getTempMatch,
  getTempPlayers,
  resetTmpMatch,
  resetTmpPlayers,
  showAlert,
} from '../../../store';
import RouteGuard from '../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import MatchFormStepper from './components/MatchFormStepper';
import { IPlayerInMatch, ITempMatch } from '../types';
import { DataError, PageHeader } from '../../../components';

export default function AddMatch() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const currentTempMatch = useSelector(getTempMatch);
  const currentTempPlayers = useSelector(getTempPlayers);

  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ITempMatch | null>(null);
  const [currentPlayers, setCurrentPlayers] = useState<IPlayerInMatch[]>([]);

  const [addMatch, { error, loading: addLoading }] = useMutation(ADD_MATCH, {
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
    ],
  });

  const {
    opponents,
    competitions,
    seasonOptions,
    loading,
    error: inputError,
  } = useMatchDetailsInput();

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
    addMatch({ variables: { ...data } })
      .then(() => {
        dispatch(showAlert({ text: 'Match added successfully!', type: 'success' }));
        dispatch(resetTmpMatch());
        dispatch(resetTmpPlayers());
        navigate(-1);
      })
      .catch(err => {
        dispatch(showAlert({ text: 'Failed to add match.', type: 'error' }));
        console.error('Add match error', err);
      });
  };
  const isLoading = loading || addLoading;

  const renderContent = () => {
    return defaultValues ? (
      <MatchFormStepper
        defaultValues={defaultValues}
        currentPlayers={currentPlayers}
        teamId={teamId as string}
        seasonOptions={seasonOptions}
        opponents={opponents}
        competitions={competitions}
        onSubmit={onSubmit}
        loading={isLoading}
        error={error || inputError}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_MATCH}>
        {error ? <DataError error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
