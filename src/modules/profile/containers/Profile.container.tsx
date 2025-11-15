import { useQuery } from '@apollo/client';

import { FETCH_USER } from '../graphql';

import { AUTH_ROLES } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from '../../../router/RouteGuard';
import ProfileDetails from '../components/Details';
import Profile from '../components/Profile';
import { pages, PROFILE_ADMIN_LINKS } from '../constants';
import ProfileOrganizations from './ProfileOrganization';
import ProfileTeams from './ProfileTeams.container';
import { PageHeader } from '../../../components';

export default function ProfileContainer() {
  const { data, loading, error } = useQuery(FETCH_USER);

  const renderContent = () => {
    return !loading ? (
      <>
        <Profile user={data?.user || null} />
        <ProfileDetails user={data?.user || null} />
        <ProfileOrganizations />
        <ProfileTeams />
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <PageHeader title={pages.USER_PROFILE_PAGE} links={PROFILE_ADMIN_LINKS}>
        <>{error ? <ErrorGraphql error={error} /> : renderContent()}</>
      </PageHeader>
    </RouteGuard>
  );
}
