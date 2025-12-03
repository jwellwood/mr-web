import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_COMPETITION, FETCH_COMPETITIONS } from '../graphql';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import DeleteModal from '../../../components/modals/DeleteModal.tsx';

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

  const renderContent = () => {
    return !loading ? <DeleteModal title="Competition" onDelete={onDelete} /> : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
