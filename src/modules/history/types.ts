export interface IAward {
  seasonId: string;
  awardName: string;
  winners: string[] | { name: string; _id: string }[];
  awardValue?: number;
  comment?: string;
}

export interface IAwardByPlayer {
  season: string;
  awardName: string;
  awardValue?: number;
  comment?: string;
}

export interface ITeamSeason {
  _id: string;
  teamId: string;
  name: string;
  yearStarted: string;
  yearEnded: string;
  awards: IAward[];
  leaguePosition?: number;
  division?: string;
  comment?: string;
}

export interface ILeaguePositions {
  seasonId: string;
  name: string;
  position: number;
  division?: string;
}
