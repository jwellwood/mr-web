import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_RESULT, FETCH_LEAGUE_TABLES, FETCH_RESULTS } from '../graphql';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import DeleteModal from '../../../components/modals/DeleteModal.tsx';

export default function DeleteResult() {
  const { orgId, orgSeasonId, resultId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteResult, { loading, error }] = useMutation(DELETE_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId } },
    ],
  });

  const onDelete = async () => {
    return deleteResult({ variables: { orgId, resultId } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: 'Result deleted successfully!', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  const renderContent = () => {
    return !loading ? <DeleteModal title="Result" onDelete={onDelete} /> : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
