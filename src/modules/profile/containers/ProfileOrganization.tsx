import { useQuery } from '@apollo/client/react';
import { lazy } from 'react';
import { FETCH_ORGS_BY_USER } from '../graphql';

const ProfileOrgView = lazy(() => import('../components/ProfileOrgView'));

export default function ProfileOrganizations() {
  const { data, loading, error } = useQuery(FETCH_ORGS_BY_USER);

  return <ProfileOrgView data={data} loading={loading} error={error} />;
}
