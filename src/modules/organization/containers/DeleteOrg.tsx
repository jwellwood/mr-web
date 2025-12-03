import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_ORG } from '../graphql';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import DeleteModal from '../../../components/modals/DeleteModal.tsx';
import { PROFILE_PATHS } from '../../profile/router/paths.ts';

export default function DeleteOrg() {
  const { orgId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteOrg, { loading, error }] = useMutation(DELETE_ORG);

  const onDelete = async () => {
    return deleteOrg({ variables: { orgId } })
      .then(() => {
        navigate(PROFILE_PATHS.PROFILE);
        dispatch(showAlert({ text: 'Organization deleted', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  const renderContent = () => {
    return !loading ? <DeleteModal title="Organization" onDelete={onDelete} /> : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
