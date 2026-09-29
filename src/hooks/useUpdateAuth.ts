import { useApolloClient } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { FETCH_USER } from '../modules/profile/graphql';
import { AppDispatch, authPayloadFromUser, setAuth } from '../store';
import { authStorage } from '../utils';

export const useUpdateAuth = () => {
  const client = useApolloClient();
  const dispatch: AppDispatch = useDispatch();

  const updateAuth = async (token: string) => {
    authStorage.setToken(token);
    await client.clearStore();
    const userRes = await client.query({
      query: FETCH_USER,
      fetchPolicy: 'network-only',
    });
    const user = userRes.data?.user;

    if (user) {
      dispatch(setAuth(authPayloadFromUser(user)));
    }
  };

  return { updateAuth };
};
