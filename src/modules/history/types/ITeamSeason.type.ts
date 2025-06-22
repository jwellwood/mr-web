import { IAward } from './IAward.type';

export interface ITeamSeason {
  _id: string;
  teamId: string;
  name: string;
  yearStarted: string;
  yearEnded: string;
  awards: IAward[];
  leaguePosition?: number;
  totalFinalPositions?: number;
  division?: string;
  comment?: string;
}

export interface ILeaguePositions {
  seasonId: string;
  name: string;
  position: number;
  totalFinalPositions?: number;
  division?: string;
}

export interface ITeamSeasonInput {
  yearStarted: string;
  yearEnded: string;
  leaguePosition?: string;
  totalFinalPositions?: string;
  division?: string;
  comment?: string;
}
