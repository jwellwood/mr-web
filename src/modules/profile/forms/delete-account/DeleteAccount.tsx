import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../../components/modals';
import { apolloClient } from '../../../../services/graphql/apolloClient';
import { showAlert, resetAuth } from '../../../../store';
import { AUTH_PATHS } from '../../../auth/router/';
import { DELETE_USER } from '../../graphql';

export default function DeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER);

  const onDelete = async () => {
    return deleteUser()
      .then(async () => {
        dispatch(showAlert({ text: 'User account deleted successfully', type: 'success' }));
        await apolloClient.resetStore();
        dispatch(resetAuth());
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(err => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
        console.error(err);
      });
  };

  return <DeleteModal title="Account" onDelete={onDelete} loading={loading} error={error} />;
}
