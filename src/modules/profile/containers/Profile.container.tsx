import { useQuery } from '@apollo/client';

import { FETCH_USER } from '../graphql';

import { AUTH_ROLES } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from '../../../router/RouteGuard';
import ProfileDetails from '../components/Details';
import Profile from '../components/Profile';
import { pages, PROFILE_ADMIN_LINKS } from '../constants';
import ProfileOrganizations from './ProfileOrganization';
import ProfileTeams from './ProfileTeams.container';

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
      <CustomAppBar
        title={pages.USER_PROFILE_PAGE}
        actionButton={<EditLinksModal data={PROFILE_ADMIN_LINKS} />}
      >
        <>{error ? <ErrorGraphql error={error} /> : renderContent()}</>
      </CustomAppBar>
    </RouteGuard>
  );
}
