import { lazy } from 'react';

export const Team = lazy(() => import('../main'));
export const AddTeam = lazy(() => import('../forms/AddTeam'));
export const EditTeam = lazy(() => import('../forms/EditTeam'));
export const EditBadge = lazy(() => import('../forms/EditTeamBadge'));
export const DeleteTeam = lazy(() => import('../forms/DeleteTeam'));
