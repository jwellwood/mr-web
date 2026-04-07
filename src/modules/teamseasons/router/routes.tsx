import { lazy } from 'react';

export const Season = lazy(() => import('../containers/Season'));
export const AddTeamSeason = lazy(() => import('../containers/AddSeason'));
export const EditTeamSeason = lazy(() => import('../containers/EditSeason'));
