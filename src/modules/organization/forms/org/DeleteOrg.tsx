import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../../components';
import { useCustomParams } from '../../../../hooks';
import { showAlert } from '../../../../store';
import { PROFILE_PATHS } from '../../../profile/router/paths';
import { DELETE_ORG } from '../../graphql';

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

  return <DeleteModal title="Organization" onDelete={onDelete} error={error} loading={loading} />;
}
