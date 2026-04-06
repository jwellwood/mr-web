import { useMutation, useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams, useSeasons } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import type { PlayerFormData } from '../forms/player-form/schema';
import { FETCH_PLAYER, EDIT_PLAYER } from '../graphql';
import { mapFormToPlayer, mapPlayerToForm } from '../helpers/mapPlayerForm';
import EditPlayerPage from '../pages/EditPlayerPage';

export default function EditPlayer() {
  const { t } = useTranslation('players');
  const { teamId, playerId } = useCustomParams();
  const { loading: seasonLoading } = useSeasons();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(FETCH_PLAYER, {
    variables: { playerId: playerId! },
  });
  const [updatePlayer, { loading: updateLoading }] = useMutation(EDIT_PLAYER, {
    onError: () => dispatch(showAlert({ text: t('ALERTS.EDIT_PLAYER.ERROR'), type: 'error' })),
  });

  // Derive form values directly from query data
  const defaultValues = data?.player ? mapPlayerToForm(data.player) : null;

  const onSubmit = (formData: PlayerFormData) => {
    try {
      updatePlayer({
        variables: {
          teamId: teamId!,
          playerId: playerId!,
          ...mapFormToPlayer(formData),
        },
      }).then(() => {
        refetch({ playerId: playerId! });
        dispatch(
          showAlert({
            text: t('ALERTS.EDIT_PLAYER.SUCCESS'),
            type: 'success',
          })
        );
        navigate(-1);
      });
    } catch (error) {
      console.error("Couldn't update player: ", error);
      dispatch(
        showAlert({
          text: t('ALERTS.EDIT_PLAYER.ERROR'),
          type: 'error',
        })
      );
    }
  };

  const isLoading = loading || seasonLoading || updateLoading;

  return (
    <EditPlayerPage
      loading={isLoading}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
