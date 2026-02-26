import { lazy } from 'react';

export const Org = lazy(() => import('../main'));
export const AddOrg = lazy(() => import('../org/forms/AddOrg'));
export const EditOrg = lazy(() => import('../org/forms/EditOrg'));
export const EditOrgBadge = lazy(() => import('../org/forms/UpdateOrgBadge'));
// Comp
export const Competition = lazy(() => import('../competitions/containers/Competition'));
export const AddCompetition = lazy(() => import('../competitions/forms/AddCompetition'));
export const EditCompetition = lazy(() => import('../competitions/forms/EditCompetition'));
// Season
export const OrgSeason = lazy(() => import('../org-seasons/containers/OrgSeason'));
export const AddOrgSeason = lazy(() => import('../org-seasons/forms/AddOrgSeason'));
export const EditOrgSeason = lazy(() => import('../org-seasons/forms/EditOrgSeason'));
export const AdminOrgSeason = lazy(() => import('../org-seasons/containers/SeasonAdmin'));
// Result
export const Result = lazy(() => import('../results/containers/Result'));
export const AddResult = lazy(() => import('../results/forms/AddResult'));
export const EditResult = lazy(() => import('../results/forms/EditResult'));
export const AddGameWeek = lazy(() => import('../results/forms/AddGameWeek'));
