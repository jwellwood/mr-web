import { useQuery } from '@apollo/client';
import { lazy } from 'react';
import { FETCH_TEAMS_BY_USER } from '../graphql';

const ProfileTeamsView = lazy(() => import('../components/ProfileTeamsView'));

export default function ProfileTeams() {
  const { data, loading, error } = useQuery(FETCH_TEAMS_BY_USER);

  return <ProfileTeamsView data={data} loading={loading} error={error} />;
}
