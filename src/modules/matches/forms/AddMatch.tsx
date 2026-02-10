import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks/useCustomParams';
import {
  AppDispatch,
  getTempMatch,
  getTempPlayers,
  resetTmpMatch,
  resetTmpPlayers,
  showAlert,
} from '../../../store';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql/';
import { PAGES } from '../constants';
import { ADD_MATCH, FETCH_MATCHES, FETCH_MATCHES_STATS } from '../graphql';
import { ITempMatch, ITempMatchPlayers } from '../types';
import MatchFormStepper from './components/MatchFormStepper';
import { mapTempMatchToMutation } from './mappers';

export default function AddMatch() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const currentTempMatch = useSelector(getTempMatch);
  const currentTempPlayers = useSelector(getTempPlayers);

  const dispatch: AppDispatch = useDispatch();

  const [currentMatch, setCurrentMatch] = useState<ITempMatch | null>(null);
  const [currentPlayers, setCurrentPlayers] = useState<ITempMatchPlayers[]>([]);

  const [addMatch, { error, loading }] = useMutation(ADD_MATCH, {
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

  useEffect(() => {
    setCurrentMatch(currentTempMatch);
  }, [currentTempMatch]);

  useEffect(() => {
    setCurrentPlayers(currentTempPlayers);
  }, [currentTempPlayers]);

  const onSubmit = () => {
    if (!teamId) {
      console.error('Missing team id');
      return;
    }

    addMatch({
      variables: { ...mapTempMatchToMutation(teamId!, currentMatch!, currentPlayers) },
    })
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

  const renderContent = () => {
    return currentMatch ? (
      <MatchFormStepper onSubmit={onSubmit} loading={loading} error={error} />
    ) : (
      <Spinner />
    );
  };

  return (
    <PageHeader title={PAGES.ADD_MATCH}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
