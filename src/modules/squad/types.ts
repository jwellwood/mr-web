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
  names: {
    name: string;
    id: string;
  }[];
};

export type TSingleSeasonSquadRecord = {
  value: number;
  players: {
    name: string;
    id: string;
  }[];
  seasons: {
    name: string;
    id: string;
  }[];
};

export interface ISquadRecords {
  apps: TStatField[];
  goals: TStatField[];
  assists: TStatField[];
  mvp: TStatField[];
}

export interface ISquadSingleSeasonRecords {
  goals: TSingleSeasonSquadRecord;
  assists: TSingleSeasonSquadRecord;
  combined: TSingleSeasonSquadRecord;
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

export interface IPlayerRecordMatch {
  teamGoals: number;
  opponentGoals: number;
  opponent: string;
  date: string;
  _id: string;
}
