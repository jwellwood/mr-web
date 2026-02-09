import { lazy } from 'react';
import { PageHeader } from '../../components';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';
import { useAuth, useCustomParams } from '../../hooks';
import { PAGES, ORG_ADMIN_LINKS } from './constants';

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
    <PageHeader title={PAGES.ORG} links={isOrgAuth ? ORG_ADMIN_LINKS : undefined}>
      <>
        <Org />
        <CustomTabs type={TAB_TYPES.ORG} tabs={tabs} level="primary" />
      </>
    </PageHeader>
  );
}
