import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_PLAYER } from '../../graphql';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { DeleteModal } from '../../../../components/modals';

export default function DeletePlayer() {
  const { teamId, playerId } = useCustomParams();

  const navigate = useNavigate();

  const [deletePlayer, { loading, error }] = useMutation(DELETE_PLAYER);

  const dispatch: AppDispatch = useDispatch();

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
            text: 'Player deleted successfully!',
            type: 'success',
          })
        );
        navigate(-2);
      });
    } catch (error) {
      console.error("Couldn't delete player: ", error);
      dispatch(
        showAlert({
          text: 'There was a problem deleting the player',
          type: 'error',
        })
      );
    }
  };

  return <DeleteModal title="Player" loading={loading} error={error} onDelete={onDelete} />;
}
