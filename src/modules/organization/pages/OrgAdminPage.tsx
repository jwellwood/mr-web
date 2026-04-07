import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { getOrgAdminLinks } from '../helpers/getOrgAdminLinks';

const OrgTeams = lazy(() => import('../containers/OrgTeams'));
const OrgSeasons = lazy(() => import('../../seasons/containers/OrgSeasons'));
const AdminCompetitions = lazy(() => import('../../competitions/containers/AdminCompetitions'));
const OrgAdminUsers = lazy(() => import('../containers/OrgAdmin'));

export default function OrgAdmin() {
  const { t } = useTranslation('organization');

  const tabs: ITab[] = [
    { label: t('TABS.TEAMS'), component: <OrgTeams /> },
    { label: t('TABS.SEASONS'), component: <OrgSeasons /> },
    { label: t('TABS.COMPETITIONS'), component: <AdminCompetitions /> },
    { label: t('TABS.USERS'), component: <OrgAdminUsers /> },
  ];

  return (
    <PageHeader title={t('PAGES.ADMIN')} links={getOrgAdminLinks(t)}>
      <CustomTabs type={TAB_TYPES.ORG_ADMIN} tabs={tabs} level="secondary" />
    </PageHeader>
  );
}
