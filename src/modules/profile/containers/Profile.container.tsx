import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { ORG, PROFILE } from '../../../router/paths';
import RouteGuard from '../../../router/RouteGuard';
import ProfileDetails from '../components/Details';
import Profile from '../components/Profile';
import { pages } from '../constants';
import { GET_USER } from '../graphql';
import ProfileOrganizations from './ProfileOrganization';
import ProfileTeams from './ProfileTeams.container';

const ProfileContainer: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USER);

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  const links = [
    { label: 'Add New Organization', type: LINK_TYPE.ADD, link: ORG.ADD },
    { label: 'Edit Profile', type: LINK_TYPE.EDIT, link: PROFILE.EDIT },
    { label: 'Edit Image', type: LINK_TYPE.EDIT, link: PROFILE.EDIT_IMAGE },
    {
      label: 'Change Password',
      type: LINK_TYPE.EDIT,
      link: PROFILE.CHANGE_PASSWORD,
    },
    { label: 'Delete Account', type: LINK_TYPE.DELETE, link: PROFILE.DELETE },
  ];

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <CustomAppBar
        title={pages.USER_PROFILE_PAGE}
        actionButton={<EditLinksModal data={links} />}
      >
        {!loading ? (
          <>
            <Profile user={data?.user} />
            <ProfileOrganizations />
            <ProfileTeams />
            <ProfileDetails user={data?.user} />
          </>
        ) : (
          <Spinner />
        )}
      </CustomAppBar>
    </RouteGuard>
  );
};

export default ProfileContainer;
