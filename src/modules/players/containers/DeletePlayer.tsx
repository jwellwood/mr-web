import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { DELETE_PLAYER } from '../graphql';

export default function DeletePlayer() {
  const { t } = useTranslation('players');
  const { teamId, playerId } = useCustomParams();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [deletePlayer, { loading, error }] = useMutation(DELETE_PLAYER, {
    onError: () => dispatch(showAlert({ text: t('ALERTS.DELETE_PLAYER.ERROR'), type: 'error' })),
  });

  const onDelete = () => {
    try {
      deletePlayer({
        variables: {
          teamId: teamId!,
          playerId: playerId!,
        },
      }).then(() => {
        dispatch(
          showAlert({
            text: t('ALERTS.DELETE_PLAYER.SUCCESS'),
            type: 'success',
          })
        );
        navigate(-2);
      });
    } catch (error) {
      console.error("Couldn't delete player: ", error);
      dispatch(
        showAlert({
          text: t('ALERTS.DELETE_PLAYER.ERROR'),
          type: 'error',
        })
      );
    }
  };

  return <DeleteModal title="Player" loading={loading} error={error} onDelete={onDelete} />;
}
