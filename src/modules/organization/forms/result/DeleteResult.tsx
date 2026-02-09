import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../../components';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import { DELETE_RESULT, FETCH_ORG_SEASONS } from '../../graphql';

export default function DeleteResult() {
  const { orgId, resultId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteResult, { loading, error }] = useMutation(DELETE_RESULT, {
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  });

  const onDelete = async () => {
    return deleteResult({ variables: { orgId, resultId } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: 'Result deleted', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  return <DeleteModal title="Result" onDelete={onDelete} error={error} loading={loading} />;
}
