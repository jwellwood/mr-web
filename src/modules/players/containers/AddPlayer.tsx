import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams, useSeasons } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql';
import { type PlayerFormData } from '../forms/player-form/schema';
import { ADD_PLAYER } from '../graphql';
import { mapFormToPlayer } from '../helpers/mapPlayerForm';
import AddPlayerPage from '../pages/AddPlayerPage';

export default function AddPlayer() {
  const { t } = useTranslation('players');
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonId, loading } = useSeasons();

  const [addPlayer, { loading: addLoading }] = useMutation(ADD_PLAYER, {
    refetchQueries: [{ query: FETCH_SQUAD_LIST_BY_SEASON, variables: { teamId, seasonId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD_PLAYER.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: PlayerFormData) => {
    try {
      return addPlayer({ variables: { teamId: teamId!, ...mapFormToPlayer(formData) } }).then(
        () => {
          dispatch(showAlert({ text: t('ALERTS.ADD_PLAYER.SUCCESS'), type: 'success' }));
          navigate(-1);
        }
      );
    } catch (error) {
      console.error("Couldn't add player: ", error);
      dispatch(showAlert({ text: t('ALERTS.ADD_PLAYER.ERROR'), type: 'error' }));
    }
  };
  const isLoading = loading || addLoading;

  return <AddPlayerPage onSubmit={onSubmit} loading={isLoading} />;
}
