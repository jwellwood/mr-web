import { lazy } from 'react';

export const Season = lazy(() => import('../containers/Season'));
export const AddTeamSeason = lazy(() => import('../forms/season/AddSeason'));
export const EditTeamSeason = lazy(() => import('../forms/season/EditSeason'));
export const Trophy = lazy(() => import('../containers/Trophy'));
export const AddTrophy = lazy(() => import('../forms/trophy/AddTrophy'));
export const EditTrophy = lazy(() => import('../forms/trophy/EditTrophy'));
export const Award = lazy(() => import('../containers/Award'));
export const AddAward = lazy(() => import('../forms/award/AddAward'));
export const EditAward = lazy(() => import('../forms/award/EditAward'));
