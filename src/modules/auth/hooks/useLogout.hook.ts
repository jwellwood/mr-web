import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { client } from 'graphql/client';
import { showAlert } from 'modules/alerts';
import { setAuth } from 'modules/auth';
import { AppDispatch } from 'reduxStore/rootReducer';
import { LOG_OUT_USER } from '../graphql';

export const useLogout = (toggleDrawer: () => void) => {
  const dispatch: AppDispatch = useDispatch();
  const [logOutUser] = useMutation(LOG_OUT_USER);

  const onLogout = () => {
    dispatch(setAuth([], [], []));
    logOutUser().then(() => {
      toggleDrawer();
      client.resetStore();
      dispatch(showAlert('You have logged out. Bye!', 'success'));
    });
  };

  return { onLogout };
};
