import { lazy } from 'react';

export const Org = lazy(() => import('../main'));
export const AddOrg = lazy(() => import('../containers/AddOrg'));
export const EditOrg = lazy(() => import('../containers/EditOrg'));
export const EditOrgBadge = lazy(() => import('../containers/UpdateOrgBadge'));

// Comp
export const AddCompetition = lazy(() => import('../../competitions/containers/AddCompetition'));
export const EditCompetition = lazy(() => import('../../competitions/containers/EditCompetition'));
// Season
export const OrgSeason = lazy(() => import('../../seasons/containers/OrgSeason'));
export const AddOrgSeason = lazy(() => import('../../seasons/containers/AddOrgSeason'));
export const EditOrgSeason = lazy(() => import('../../seasons/containers/EditOrgSeason'));
export const AdminOrgSeason = lazy(() => import('../../seasons/containers/SeasonAdmin'));
// Result
export const Result = lazy(() => import('../../results/containers/Result'));
export const AddResult = lazy(() => import('../../results/containers/AddResult'));
export const EditResult = lazy(() => import('../../results/containers/EditResult'));
export const AddGameWeek = lazy(() => import('../../results/containers/AddGameweekResults'));
// Admin
export const OrgAdmin = lazy(() => import('../pages/OrgAdminPage'));
export const AdminTeam = lazy(() => import('../containers/AdminTeam'));
export const AdminCompetition = lazy(
  () => import('../../competitions/containers/AdminCompetition')
);
