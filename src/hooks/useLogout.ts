import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { LOG_OUT_USER } from '../modules/auth/graphql';
import { apolloClient } from '../services/graphql/apolloClient';
import { AppDispatch, resetAuth, showAlert } from '../store';
import { authStorage } from '../utils';

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const [logOutUser] = useMutation(LOG_OUT_USER);

  const onLogout = () => {
    authStorage.removeToken();
    dispatch(resetAuth());

    // Clear the Apollo cache and logout on server
    logOutUser()
      .then(() => apolloClient.clearStore())
      .then(() => {
        dispatch(showAlert({ text: 'You have logged out. Bye!', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'You have logged out. Bye!', type: 'success' }));
      });
  };

  return { onLogout };
};
