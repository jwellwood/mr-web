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
    // clearStore does not refetch the profile lists after permissions change.
    await client.refetchQueries({
      include: 'active',
      onQueryUpdated: query =>
        query.queryName === 'FETCH_ORGS_BY_USER' || query.queryName === 'FETCH_TEAMS_BY_USER'
          ? query.refetch()
          : false,
    });
  };

  return { updateAuth };
};
