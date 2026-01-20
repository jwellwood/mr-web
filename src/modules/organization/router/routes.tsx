import { lazy } from 'react';

export const Org = lazy(() => import('../main'));
export const AddOrg = lazy(() => import('../forms/org/AddOrg'));
export const EditOrg = lazy(() => import('../forms/org/EditOrg'));
export const EditOrgBadge = lazy(() => import('../forms/org-badge/UpdateOrgBadge'));
// Comp
export const Competition = lazy(() => import('../containers/Competition'));
export const AddCompetition = lazy(() => import('../forms/competition/AddCompetition'));
export const EditCompetition = lazy(() => import('../forms/competition/EditCompetition'));
// Season
export const OrgSeason = lazy(() => import('../containers/OrgSeason'));
export const AddOrgSeason = lazy(() => import('../forms/org-season/AddOrgSeason'));
export const EditOrgSeason = lazy(() => import('../forms/org-season/EditOrgSeason'));
// Result
export const Result = lazy(() => import('../containers/Result'));
export const AddResult = lazy(() => import('../forms/result/AddResult'));
export const EditResult = lazy(() => import('../forms/result/EditResult'));
