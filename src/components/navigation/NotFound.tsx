import React from 'react';
import { AUTH_ROLES } from '../../app/constants';
import { CustomTypography, PageHeader } from '../typography';
import RouteGuard from '../../router/RouteGuard';
import { NOT_FOUND_PAGE } from './constants';

const NotFound: React.FC = () => {
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={NOT_FOUND_PAGE} />
      <CustomTypography color="warning">Page not found</CustomTypography>
    </RouteGuard>
  );
};

export default NotFound;
