import { lazy } from 'react';

export const Team = lazy(() => import('./containers/Team'));
export const AddTeam = lazy(() => import('./containers/AddTeam'));
export const EditTeam = lazy(() => import('./containers/UpdateDetails'));
export const EditRoles = lazy(() => import('./containers/UpdateRoles'));
export const EditBadge = lazy(() => import('./containers/UpdateTeamBadge'));
export const DeleteTeam = lazy(() => import('./containers/DeleteTeam'));
