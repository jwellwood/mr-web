import { lazy } from 'react';
import { CustomTypography, PageHeader } from '../../components';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';
import { useAuth, useCustomParams } from '../../hooks';
import { PAGES, ORG_ADMIN_LINKS } from './constants';

const Org = lazy(() => import('./org/containers/Org'));
const LeagueTables = lazy(() => import('./tables/containers/LeagueTables'));
const Results = lazy(() => import('./results/main'));
const MoreTabs = lazy(() => import('./more/main'));

export default function Team() {
  const { orgId } = useCustomParams();

  const { isOrgAuth } = useAuth('', orgId);

  const tabs: ITab[] = [
    {
      label: 'Matches',
      component: <Results />,
    },
    {
      label: 'Tables',
      component: <LeagueTables />,
    },
    {
      label: 'Players',
      component: <CustomTypography>Players</CustomTypography>,
    },
    {
      label: 'More',
      component: <MoreTabs />,
    },
  ];

  return (
    <PageHeader title={PAGES.ORG} links={isOrgAuth ? ORG_ADMIN_LINKS : undefined}>
      <>
        <Org />
        <CustomTabs type={TAB_TYPES.RESULTS} tabs={tabs} level="primary" />
      </>
    </PageHeader>
  );
}
