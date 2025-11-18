import { AUTH_ROLES } from '../app/constants';
import { CustomTypography } from '../components/typography';
import RouteGuard from './RouteGuard';
import { NOT_FOUND_PAGE } from '../components/navigation/constants';
import { PageHeader } from '../components/shared';

export default function NotFound() {
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={NOT_FOUND_PAGE}>
        <CustomTypography color="warning">Page not found</CustomTypography>
      </PageHeader>
    </RouteGuard>
  );
}
