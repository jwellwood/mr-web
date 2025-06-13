import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { LOG_OUT_USER } from '../graphql';
import { AppDispatch } from '../../../store/store.ts';
import { resetAuth } from '../../../store/features/auth/authSlice.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { apolloClient } from '../../../services/graphql/apolloClient.ts';

export const useLogout = (toggleDrawer: () => void) => {
  const dispatch: AppDispatch = useDispatch();
  const [logOutUser] = useMutation(LOG_OUT_USER);

  const onLogout = () => {
    dispatch(resetAuth());
    logOutUser().then(() => {
      localStorage.removeItem('token');
      toggleDrawer();
      apolloClient.resetStore().then(() => {
        dispatch(showAlert({ text: 'You have logged out. Bye!', type: 'success' }));
      });
    });
  };

  return { onLogout };
};
