import { lazy } from 'react';

export const Team = lazy(() => import('../main'));
export const AddTeam = lazy(() => import('../forms/add-team/AddTeam'));
export const EditTeam = lazy(() => import('../forms/edit-team/EditTeam'));
export const EditBadge = lazy(() => import('../forms/edit-team-badge/EditTeamBadge'));
export const DeleteTeam = lazy(() => import('../forms/delete-team/DeleteTeam'));
