import { useQuery } from '@apollo/client/react';
import { FETCH_USER } from '../graphql';
import ProfilePage from '../pages/ProfilePage';

export default function ProfileContainer() {
  const { data, loading, error } = useQuery(FETCH_USER);

  return <ProfilePage data={data} loading={loading} error={error} />;
}
