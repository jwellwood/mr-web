import { lazy } from 'react';
import { PageHeader } from '../../../components';
import { CustomTabs, ITab } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { ORG_ADMIN_LINKS } from '../constants';

const OrgTeams = lazy(() => import('../containers/OrgTeams'));
const OrgSeasons = lazy(() => import('../containers/OrgSeasons'));
const AdminCompetitions = lazy(() => import('./competitions/containers/AdminCompetitions'));
const OrgAdminUsers = lazy(() => import('./org/containers/OrgAdmin'));

const PAGES = {
  ORG_ADMIN: 'Admin',
} as const;

export default function OrgAdmin() {
  const tabs: ITab[] = [
    { label: 'Teams', component: <OrgTeams /> },
    { label: 'Seasons', component: <OrgSeasons /> },
    { label: 'Competitions', component: <AdminCompetitions /> },
    { label: 'Users', component: <OrgAdminUsers /> },
  ];

  return (
    <PageHeader title={PAGES.ORG_ADMIN} links={ORG_ADMIN_LINKS}>
      <CustomTabs type={TAB_TYPES.ORG_ADMIN} tabs={tabs} level="secondary" />
    </PageHeader>
  );
}
