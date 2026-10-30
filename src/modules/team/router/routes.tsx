import { lazy } from 'react';

export const Team = lazy(() => import('../pages/TeamPage'));
export const AddTeam = lazy(() => import('../containers/AddTeam'));
export const EditTeam = lazy(() => import('../containers/EditTeam'));
export const EditBadge = lazy(() => import('../containers/EditTeamBadge'));
export const AdminTeam = lazy(() => import('../../admin/containers/AdminTeam'));
