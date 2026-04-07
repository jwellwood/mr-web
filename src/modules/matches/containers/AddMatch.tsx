import { useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks/useCustomParams';
import {
  AppDispatch,
  getTempMatch,
  getTempPlayers,
  resetTmpMatch,
  resetTmpPlayers,
  showAlert,
} from '../../../store';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql';
import { mapTempMatchToMutation } from '../forms/mappers';
import { ADD_MATCH, FETCH_MATCHES, FETCH_MATCHES_STATS } from '../graphql';
import AddMatchPage from '../pages/AddMatchPage';
import { ITempMatch, ITempMatchPlayers } from '../types';

export default function AddMatch() {
  const { t } = useTranslation('matches');
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
    onError: err => {
      dispatch(showAlert({ text: t('ALERTS.ADD_MATCH.ERROR'), type: 'error' }));
      console.error('Add match error', err);
    },
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
        dispatch(showAlert({ text: t('ALERTS.ADD_MATCH.SUCCESS'), type: 'success' }));
        dispatch(resetTmpMatch());
        dispatch(resetTmpPlayers());
        navigate(-1);
      })
      .catch(err => {
        dispatch(showAlert({ text: t('ALERTS.ADD_MATCH.ERROR'), type: 'error' }));
        console.error('Add match error', err);
      });
  };

  return (
    <AddMatchPage onSubmit={onSubmit} ready={!!currentMatch} loading={loading} error={error} />
  );
}
