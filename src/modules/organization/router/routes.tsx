import { lazy } from 'react';

export const Org = lazy(() => import('../main'));
export const AddOrg = lazy(() => import('../forms/AddOrg'));
export const EditOrg = lazy(() => import('../forms/EditOrg'));
export const EditOrgBadge = lazy(() => import('../containers/UpdateOrgBadge'));
// Comp
export const Competition = lazy(() => import('../containers/Competition'));
export const AddCompetition = lazy(() => import('../forms/AddCompetition'));
export const EditCompetition = lazy(() => import('../forms/EditCompetition'));
// Season
export const OrgSeason = lazy(() => import('../containers/OrgSeason'));
export const AddOrgSeason = lazy(() => import('../forms/AddOrgSeason'));
export const EditOrgSeason = lazy(() => import('../forms/EditOrgSeason'));
// Result
export const Result = lazy(() => import('../containers/Result'));
export const AddResult = lazy(() => import('../forms/AddResult'));
export const EditResult = lazy(() => import('../forms/EditResult'));
