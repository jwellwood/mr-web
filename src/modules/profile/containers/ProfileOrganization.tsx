import { lazy } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_ORGS_BY_USER } from '../graphql';

const ProfileOrgView = lazy(() => import('../views/ProfileOrgView'));

export default function ProfileOrganizations() {
  const { data, loading, error } = useQuery(FETCH_ORGS_BY_USER);

  return <ProfileOrgView data={data} loading={loading} error={error} />;
}
