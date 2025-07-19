import { lazy } from 'react';

export const Season = lazy(() => import('./containers/Season'));
export const AddTeamSeason = lazy(() => import('./containers/AddTeamSeason'));
export const EditTeamSeason = lazy(() => import('./containers/EditSeason'));
export const Trophy = lazy(() => import('./containers/Trophy'));
export const AddTrophy = lazy(() => import('./containers/AddTrophy'));
export const EditTrophy = lazy(() => import('./containers/EditTrophy'));
export const Award = lazy(() => import('./containers/Award'));
export const AddAward = lazy(() => import('./containers/AddAward'));
export const EditAward = lazy(() => import('./containers/EditAward'));
