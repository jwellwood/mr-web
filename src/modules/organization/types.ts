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
};

export type IOrgSeason = {
  _id: string;
  name: string;
  yearStarted: string;
  yearEnded: string;
  isCurrent: boolean;
  comment?: string;
};

export type ICompetition = {
  _id?: string;
  orgId: string;
  name: string;
  matchMinutes: number;
  playersPerTeam: number;
  competitionType: string;
  isActive: boolean;
  winners: ICompetitionWinner[];
};

export type ICompetitionWinner = {
  year: string;
  teamId: string;
  isWinner: boolean;
  isRunnerUp: boolean;
};

export type IResult = {
  _id: string;
  date: string;
  gameWeek: number;
  competitionId: {
    name: string;
    _id: string;
  };
  orgSeasonId: {
    name: string;
    _id: string;
  };
  homeTeam: {
    _id: string;
    teamName: string;
  };
  awayTeam: {
    _id: string;
    teamName: string;
  };
  homeGoals: number;
  awayGoals: number;
};

export type ILeagueTableTeam = {
  team: {
    teamName: string;
    _id: string;
  };
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
};

export type ILeagueTableData = {
  competition: {
    _id: string;
    name: string;
  };
  data: ILeagueTableTeam[];
};
