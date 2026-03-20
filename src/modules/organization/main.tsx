import { lazy } from 'react';
import { CustomButton, PageHeader } from '../../components';
import { CustomStack } from '../../components/grids';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';
import { useAuth, useCustomParams } from '../../hooks';
import { PAGES } from './constants';
import OrgHelp from './OrgHelp';
import { ORG_PATHS } from './router';

const Org = lazy(() => import('./containers/Org'));
const LeagueTables = lazy(() => import('./containers/LeagueTables'));
const Results = lazy(() => import('./results/main'));
const OrgTeams = lazy(() => import('./containers/OrgTeams'));
const OrgSeasons = lazy(() => import('./containers/OrgSeasons'));

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
      label: 'Teams',
      component: <OrgTeams />,
    },
    {
      label: 'History',
      component: <OrgSeasons />,
    },
  ];

  return (
    <PageHeader title={PAGES.ORG} help={<OrgHelp />}>
      <>
        {isOrgAuth && (
          <CustomStack>
            <CustomButton link={ORG_PATHS.ORG_ADMIN} color="tertiary">
              Admin
            </CustomButton>
          </CustomStack>
        )}
        <Org />
        <CustomTabs type={TAB_TYPES.RESULTS} tabs={tabs} level="primary" />
      </>
    </PageHeader>
  );
}
