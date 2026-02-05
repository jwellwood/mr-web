import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_COMPETITION, FETCH_COMPETITIONS } from '../../graphql';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import { DeleteModal } from '../../../../components';

export default function DeleteCompetition() {
  const { orgId, competitionId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteCompetition, { loading, error }] = useMutation(DELETE_COMPETITION, {
    refetchQueries: [{ query: FETCH_COMPETITIONS, variables: { orgId } }],
  });

  const onDelete = async () => {
    return deleteCompetition({ variables: { orgId, competitionId } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: 'Competition deleted', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  return <DeleteModal title="Competition" onDelete={onDelete} error={error} loading={loading} />;
}
