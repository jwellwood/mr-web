import { IImage } from '../../components/avatars/image-avatar/types';

export type IOrganization = {
  _id?: string;
  name: string;
  website?: string;
  yearFounded?: string;
  city: string;
  country: string;
  badge: IImage;
  competitions: ICompetition[];
  teamIds: string[];
  adminIds: string[];
};

export type IOrgSeason = {
  _id: string;
  name: string;
  yearStarted: string;
  yearEnded: string;
  isCurrent: boolean;
  comment?: string;
};

export type IOrgSeasonInput = {
  yearStarted: string;
  yearEnded: string;
  isCurrent: boolean;
  comment?: string;
};

export type IOrganizationInput = {
  name: string;
  website?: string;
  yearFounded?: string;
  city: string;
  country: string;
};

export type ICompetition = {
  _id?: string;
  orgId: string;
  name: string;
  matchMinutes: number;
  playersPerTeam: number;
  numberOfTeams: number;
  competitionType: string;
  isActive: boolean;
  winners: ICompetitionWinner[];
};

export type ICompetitionInput = {
  name: string;
  matchMinutes: number;
  playersPerTeam: number;
  numberOfTeams: number;
  competitionType: string;
  isActive: boolean;
};

export type ICompetitionWinner = {
  year: string;
  teamId: string;
  isWinner: boolean;
  isRunnerUp: boolean;
};
