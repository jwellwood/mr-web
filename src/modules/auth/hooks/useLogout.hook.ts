import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { apolloClient } from '../../../services/graphql/apolloClient';

import { LOG_OUT_USER } from '../graphql';
import { AppDispatch, resetAuth, showAlert } from '../../../store';

export const useLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const [logOutUser] = useMutation(LOG_OUT_USER);

  const onLogout = () => {
    dispatch(resetAuth());
    logOutUser().then(() => {
      localStorage.removeItem('token');

      apolloClient.resetStore().then(() => {
        dispatch(showAlert({ text: 'You have logged out. Bye!', type: 'success' }));
      });
    });
  };

  return { onLogout };
};
