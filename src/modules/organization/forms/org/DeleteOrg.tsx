import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_ORG } from '../../graphql';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import { PROFILE_PATHS } from '../../../profile/router/paths';
import DeleteModal from '../../../../components/modals/DeleteModal';

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

  return !loading ? (
    <DeleteModal title="Organization" onDelete={onDelete} error={error} />
  ) : (
    <Spinner />
  );
}
