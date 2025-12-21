import { ReactElement } from 'react';

export interface IPastPlayer {
  _id: string;
  name: string;
  position: string;
  image: string;
  nationality: string;
  joined: string;
  left: string;
  seasons: number;
}

export type TStatField = {
  value: number;
  disabled: boolean;
  names: {
    name: string;
    id: string;
  }[];
}[];

export interface IRecords {
  apps: TStatField;
  goals: TStatField;
  assists: TStatField;
  mvp: TStatField;
}

export interface SquadTableRow {
  number?: number | ReactElement;
  position?: string | ReactElement;
  nationality: { value: ReactElement };
  image: { value: ReactElement };
  name: { value: ReactElement };
  apps: number | ReactElement;
  goals: number | ReactElement;
  assists: number | ReactElement;
}

export interface ISquadSeasonStats {
  _id: string;
  name: string;
  nationality: string;
  dateOfBirth: Date;
  apps: number;
  goals: number;
  assists: number;
  mvp: number;
  conceded: number;
  cleanSheets: number;
  goalsPerGame: number;
  assistsPerGame: number;
  concededPerGame: number;
  mvpPerGame: number;
}

export interface ISquadListStats {
  _id: string;
  name: string;
  position: string;
  number: number;
  image: {
    url: string;
    public_id: string;
  };
  nationality: string;
  apps: number;
  goals: number;
  assists: number;
}
