import { AUTH_ROLES } from '../../../app/constants';
import { CustomTypography } from '../../../components/typography';
import RouteGuard from '../../../router/RouteGuard';

interface Props {
  email: string;
}

export default function ValidationEmailSent({ email }: Props) {
  return (
    <>
      <RouteGuard authorization={AUTH_ROLES.NONE}>
        <CustomTypography color="data">
          An email has been sent to {email}. Click the link to validate your account
        </CustomTypography>
      </RouteGuard>
    </>
  );
}
