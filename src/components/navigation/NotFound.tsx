import { AUTH_ROLES } from '../../app/constants';
import { CustomTypography } from '../typography';
import RouteGuard from '../../router/RouteGuard';
import { NOT_FOUND_PAGE } from './constants';
import { PageHeader } from '../shared';

export default function NotFound() {
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={NOT_FOUND_PAGE}>
        <CustomTypography color="warning">Page not found</CustomTypography>
      </PageHeader>
    </RouteGuard>
  );
}
