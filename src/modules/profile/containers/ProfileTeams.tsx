import { lazy } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_TEAMS_BY_USER } from '../graphql';

const ProfileTeamsView = lazy(() => import('../views/ProfileTeamsView'));

export default function ProfileTeams() {
  const { data, loading, error } = useQuery(FETCH_TEAMS_BY_USER);

  return <ProfileTeamsView data={data} loading={loading} error={error} />;
}
