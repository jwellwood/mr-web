import { useQuery } from '@apollo/client/react';
import { lazy } from 'react';
import { FETCH_ORGS_BY_USER, FETCH_TEAMS_BY_USER } from '../graphql';

const ProfileOrgView = lazy(() => import('../components/ProfileOrgView'));

export default function ProfileOrganizations() {
  const orgsQuery = useQuery(FETCH_ORGS_BY_USER);
  const teamsQuery = useQuery(FETCH_TEAMS_BY_USER);
  const error = orgsQuery.error || teamsQuery.error;
  const loading = orgsQuery.loading || teamsQuery.loading;
  const orgs = new Map(orgsQuery.data?.orgs.map(org => [org._id, org]) ?? []);

  teamsQuery.data?.teams.forEach(({ orgId }) => {
    if (orgId && !orgs.has(orgId._id)) {
      orgs.set(orgId._id, orgId);
    }
  });

  return (
    <ProfileOrgView
      data={orgsQuery.data && teamsQuery.data && !error ? { orgs: [...orgs.values()] } : undefined}
      loading={loading}
      error={error}
    />
  );
}
