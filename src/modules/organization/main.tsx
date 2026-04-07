import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomButton, PageHeader } from '../../components';
import { CustomStack } from '../../components/grids';
import { CustomTabs, ITab } from '../../components/tabs';
import { TAB_TYPES } from '../../constants';
import { useAuth, useCustomParams } from '../../hooks';
import OrgHelp from './components/OrgHelp';
import { ORG_PATHS } from './router';

const Org = lazy(() => import('./containers/Org'));
const LeagueTables = lazy(() => import('../results/containers/LeagueTables'));
const Results = lazy(() => import('../results/main'));
const OrgTeams = lazy(() => import('./containers/OrgTeams'));
const OrgSeasons = lazy(() => import('../seasons/containers/OrgSeasons'));

export default function Team() {
  const { t } = useTranslation('organization');
  const { orgId } = useCustomParams();

  const { isOrgAuth } = useAuth('', orgId);

  const tabs: ITab[] = [
    {
      label: t('TABS.MATCHES'),
      component: <Results />,
    },
    {
      label: t('TABS.TABLES'),
      component: <LeagueTables />,
    },
    {
      label: t('TABS.TEAMS'),
      component: <OrgTeams />,
    },
    {
      label: t('TABS.HISTORY'),
      component: <OrgSeasons />,
    },
  ];

  return (
    <PageHeader title={t('PAGES.ORG')} help={<OrgHelp />}>
      <>
        {isOrgAuth && (
          <CustomStack>
            <CustomButton link={ORG_PATHS.ORG_ADMIN} color="tertiary">
              {t('PAGES.ADMIN')}
            </CustomButton>
          </CustomStack>
        )}
        <Org />
        <CustomTabs type={TAB_TYPES.RESULTS} tabs={tabs} level="primary" />
      </>
    </PageHeader>
  );
}
