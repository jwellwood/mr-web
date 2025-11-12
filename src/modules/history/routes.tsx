import { lazy } from 'react';

export const Season = lazy(() => import('./containers/Season'));
export const AddTeamSeason = lazy(() => import('./forms/AddSeason'));
export const EditTeamSeason = lazy(() => import('./forms/EditSeason'));
export const Trophy = lazy(() => import('./containers/Trophy'));
export const AddTrophy = lazy(() => import('./forms/AddTrophy'));
export const EditTrophy = lazy(() => import('./forms/EditTrophy'));
export const Award = lazy(() => import('./containers/Award'));
export const AddAward = lazy(() => import('./forms/AddAward'));
export const EditAward = lazy(() => import('./forms/EditAward'));
