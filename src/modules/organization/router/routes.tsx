import { lazy } from 'react';

export const Org = lazy(() => import('../main'));
export const AddOrg = lazy(() => import('../admin/org/forms/AddOrg'));
export const EditOrg = lazy(() => import('../admin/org/forms/EditOrg'));
export const EditOrgBadge = lazy(() => import('../admin/org/forms/UpdateOrgBadge'));

// Comp
export const AddCompetition = lazy(() => import('../admin/competitions/forms/AddCompetition'));
export const EditCompetition = lazy(() => import('../admin/competitions/forms/EditCompetition'));
// Season
export const OrgSeason = lazy(() => import('../containers/OrgSeason'));
export const AddOrgSeason = lazy(() => import('../admin/seasons/forms/AddOrgSeason'));
export const EditOrgSeason = lazy(() => import('../admin/seasons/forms/EditOrgSeason'));
export const AdminOrgSeason = lazy(() => import('../admin/seasons/containers/SeasonAdmin'));
// Result
export const Result = lazy(() => import('../../results/containers/Result'));
export const AddResult = lazy(() => import('../../results/forms/result/AddResult'));
export const EditResult = lazy(() => import('../../results/forms/result/EditResult'));
export const AddGameWeek = lazy(
  () => import('../../results/forms/batch-result/AddGameweekResults')
);
// Admin
export const OrgAdmin = lazy(() => import('../admin/main'));
export const AdminTeam = lazy(() => import('../admin/teams/containers/AdminTeam'));
export const AdminCompetition = lazy(
  () => import('../admin/competitions/containers/AdminCompetition')
);
