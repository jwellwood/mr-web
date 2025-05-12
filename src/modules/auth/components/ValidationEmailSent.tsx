import React from 'react';
import { AUTH_ROLES } from '../../../app/constants';
import { CustomTypography } from '../../../components/typography';
import RouteGuard from '../../../router/RouteGuard';

interface Props {
  email: string;
}

const ValidationEmailSent: React.FC<Props> = ({ email }) => {
  return (
    <>
      <RouteGuard authorization={AUTH_ROLES.NONE}>
        <CustomTypography color="data">
          An email has been sent to {email}. Click the link to validate your account
        </CustomTypography>
      </RouteGuard>
    </>
  );
};

export default ValidationEmailSent;
