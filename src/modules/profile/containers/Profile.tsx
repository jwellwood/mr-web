import { useQuery } from '@apollo/client/react';
import { lazy } from 'react';
import { PageContainer } from '../../../components';
import { useAuth } from '../../../hooks';
import { PAGES, PROFILE_ADMIN_LINKS } from '../constants';
import { FETCH_USER } from '../graphql';

const ProfileView = lazy(() => import('../components/ProfileView'));
const ProfileOrganizations = lazy(() => import('./ProfileOrganization'));
const ProfileTeams = lazy(() => import('./ProfileTeams'));

export default function ProfileContainer() {
  const { data, loading, error } = useQuery(FETCH_USER);
  const { isAuth } = useAuth();

  return (
    <PageContainer title={PAGES.USER_PROFILE_PAGE} links={isAuth ? PROFILE_ADMIN_LINKS : undefined}>
      <>
        <ProfileView data={data} loading={loading} error={error} />
        <ProfileOrganizations />
        <ProfileTeams />
      </>
    </PageContainer>
  );
}
