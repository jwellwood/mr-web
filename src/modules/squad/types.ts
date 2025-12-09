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
