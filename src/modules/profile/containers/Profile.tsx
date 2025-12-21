import { lazy } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_USER } from '../graphql';
import { AUTH_ROLES } from '../../../constants';
import { PAGES, PROFILE_ADMIN_LINKS } from '../constants';
import { PageContainer } from '../../../components';

const ProfileView = lazy(() => import('../views/ProfileView'));
const ProfileOrganizations = lazy(() => import('./ProfileOrganization'));
const ProfileTeams = lazy(() => import('./ProfileTeams'));

export default function ProfileContainer() {
  const { data, loading, error } = useQuery(FETCH_USER);

  return (
    <PageContainer
      auth={AUTH_ROLES.USER}
      title={PAGES.USER_PROFILE_PAGE}
      links={PROFILE_ADMIN_LINKS}
    >
      <>
        <ProfileView data={data} loading={loading} error={error} />
        <ProfileOrganizations />
        <ProfileTeams />
      </>
    </PageContainer>
  );
}
