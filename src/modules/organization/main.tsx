import { lazy } from 'react';
import { PageHeader } from '../../components';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';
import { useAuth, useCustomParams } from '../../hooks';
import { PAGES, ORG_ADMIN_LINKS } from './constants';

const Org = lazy(() => import('./org/containers/Org'));
const OrgTeams = lazy(() => import('./org/containers/OrgTeams'));
const OrgSeasons = lazy(() => import('./org-seasons/containers/OrgSeasons'));
const LeagueTables = lazy(() => import('./results/containers/LeagueTables'));
const Competitions = lazy(() => import('./competitions/containers/Competitions'));
const Results = lazy(() => import('./results/containers/Results'));

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
