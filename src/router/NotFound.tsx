import { NOT_FOUND_PAGE } from '../components/navigation/constants';
import { PageHeader } from '../components/shared';
import { CustomTypography } from '../components/typography';

export default function NotFound() {
  return (
    <PageHeader title={NOT_FOUND_PAGE}>
      <CustomTypography color="warning">Page not found</CustomTypography>
    </PageHeader>
  );
}
