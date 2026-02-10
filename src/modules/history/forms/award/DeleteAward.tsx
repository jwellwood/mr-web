import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../../components/modals';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_AWARDS, DELETE_AWARD } from '../../graphql';

export default function DeleteAward() {
  const { awardId, teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [deleteAward, { error, loading }] = useMutation(DELETE_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId: seasonId! } }],
  });

  const onDelete = async () => {
    try {
      return deleteAward({ variables: { teamId: teamId!, awardId: awardId! } }).then(() => {
        dispatch(showAlert({ text: 'Award deleted successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  return <DeleteModal title="Award" error={error} onDelete={onDelete} loading={loading} />;
}
