import { lazy } from 'react';

import { AUTH_ROLES, TAB_TYPES } from '../../app/constants';
import { CustomTabs, ITab } from '../../components/tabs';
import { useAuth, useCustomParams } from '../../hooks';
import RouteGuard from '../../router/RouteGuard';
import { PAGES, ORG_ADMIN_LINKS } from './constants';
import { PageHeader } from '../../components';

const Org = lazy(() => import('./containers/Org'));
const OrgTeams = lazy(() => import('./containers/OrgTeams'));
const OrgSeasons = lazy(() => import('./containers/OrgSeasons'));
const LeagueTables = lazy(() => import('./containers/LeagueTables'));
const Competitions = lazy(() => import('./containers/Competitions'));
const Results = lazy(() => import('./containers/Results'));

export default function Team() {
  const { orgId } = useCustomParams();

  const { isOrgAuth } = useAuth('', orgId);

  const tabs: ITab[] = [
    {
      label: 'Results',
      component: <Results />,
    },
    {
      label: 'Tables',
      component: <LeagueTables />,
    },
    {
      label: 'History',
      component: <OrgSeasons />,
    },
    {
      label: 'More',
      component: (
        <>
          <Competitions />
          <OrgTeams />
        </>
      ),
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
