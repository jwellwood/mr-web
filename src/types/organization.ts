import type { IImage } from './image';
import type { ITeam } from './team.ts';

export interface ICompetitionWinner {
  year: string;
  teamId: ITeam;
  isWinner: boolean;
  isRunnerUp: boolean;
}

export interface ICompetition {
  _id?: string;
  orgId: string;
  name: string;
  matchMinutes: number;
  playersPerTeam: number;
  numberOfTeams: number;
  competitionType: string;
  isActive: boolean;
  winners: ICompetitionWinner[];
}

export interface IOrganization {
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
}
