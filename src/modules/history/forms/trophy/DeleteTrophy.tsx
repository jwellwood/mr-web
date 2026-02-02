import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_TROPHY, FETCH_TROPHIES } from '../../graphql';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { DeleteModal } from '../../../../components/modals';

export default function DeleteTrophy() {
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [deleteTrophy, { error, loading }] = useMutation(DELETE_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId: teamId! } }],
  });

  const onDelete = async () => {
    try {
      return deleteTrophy({ variables: { teamId: teamId!, trophyId: trophyId! } }).then(() => {
        dispatch(showAlert({ text: 'Trophy deleted successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  return <DeleteModal title="Trophy" error={error} onDelete={onDelete} loading={loading} />;
}
