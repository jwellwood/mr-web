import { lazy } from 'react';

export const Org = lazy(() => import('../main'));
export const AddOrg = lazy(() => import('../containers/AddOrg'));
export const AddOrgSeason = lazy(() => import('../containers/AddOrgSeason'));
export const OrgSeason = lazy(() => import('../containers/OrgSeason'));
export const EditOrgSeason = lazy(() => import('../containers/EditOrgSeason'));
export const AddCompetition = lazy(() => import('../containers/AddCompetition'));
export const Competition = lazy(() => import('../containers/Competition'));
export const EditCompetition = lazy(() => import('../containers/EditCompetition'));
export const EditOrg = lazy(() => import('../containers/UpdateOrgDetails'));
export const EditOrgBadge = lazy(() => import('../containers/UpdateOrgBadge'));
