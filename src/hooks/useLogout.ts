import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { LOG_OUT_USER } from '../modules/auth/graphql';
import { apolloClient } from '../services/graphql/apolloClient';
import { AppDispatch, resetAuth, showAlert } from '../store';
import { authStorage } from '../utils';

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const [logOutUser] = useMutation(LOG_OUT_USER);

  const onLogout = async () => {
    authStorage.removeToken();
    dispatch(resetAuth());

    try {
      await apolloClient.clearStore();
    } catch (error) {
      console.error(error);
    }

    // Logout on server
    try {
      await logOutUser();
    } catch {
      // Local logout already succeeded; ignore server logout failure.
    }

    dispatch(showAlert({ text: 'You have logged out. Bye!', type: 'success' }));
  };

  return { onLogout };
};
