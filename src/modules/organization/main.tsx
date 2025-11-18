import { AUTH_ROLES, TAB_TYPES } from '../../app/constants';
import { CustomTabs, ITab } from '../../components/tabs';
import { useAuth } from '../../hooks';
import { useCustomParams } from '../../hooks/useCustomParams';
import RouteGuard from '../../router/RouteGuard';
import { PAGES, ORG_ADMIN_LINKS } from './constants';

import { PageHeader } from '../../components';
import Org from './containers/Org';
import OrgTeams from './containers/OrgTeams';
// import OrgSeasons from './containers/OrgSeasons';
import { CustomTypography } from '../../components/typography';

export default function Team() {
  const { orgId } = useCustomParams();

  const { isOrgAuth } = useAuth('', orgId);

  const tabs: ITab[] = [
    {
      label: 'Tables',
      component: <CustomTypography color="primary">Coming soon</CustomTypography>,
    },
    {
      label: 'Teams',
      component: <OrgTeams />,
    },

    {
      label: 'History',
      component: <CustomTypography color="primary">Coming soon</CustomTypography>,
    },
  ];

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.ORG} links={isOrgAuth ? ORG_ADMIN_LINKS : undefined}>
        <>
          <Org />
          <CustomTabs type={TAB_TYPES.ORG} tabs={tabs} level="primary" />
        </>
      </PageHeader>
    </RouteGuard>
  );
}
