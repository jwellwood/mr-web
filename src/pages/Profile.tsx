import React from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../router/paths';
import { CustomTypography } from '../components/typography';
import RouteGuard from '../router/RouteGuard';
import { AUTH_ROLES } from '../app/constants';

const Profile: React.FC = () => {
  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <div style={{ padding: '20px' }}>
        <h1>Profile Page</h1>
        <CustomTypography size="md" color="primary">
          This is the profile page. It demonstrates a protected route.
        </CustomTypography>
        <div style={{ marginTop: '20px' }}>
          <Link to={HOME}>Back to Home</Link>
        </div>
      </div>
    </RouteGuard>
  );
};

export default Profile;