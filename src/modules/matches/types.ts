import { ICompetition } from '../organization/types';
import { ITeam } from '../team/types';
import { IPlayer } from '../players/types';
import { TPosition } from '../../constants';

export interface IPlayerResponse extends Omit<IPlayerInMatch, 'playerId'> {
  playerId: string | IPlayer;
}

export interface IMostMatch {
  _id: string;
  opponent: string;
  opponentId: string;
  teamGoals: number;
  opponentGoals: number;
  date: string;
  isHome: boolean;
}

export interface IMatchRecords {
  maxDiff: IMatchList[];
  minDiff: IMatchList[];
  maxGoals: IMatchList[];
  maxConceded: IMatchList[];
}

export type IMatchList = {
  _id: string;
  date: string;
  isHome: boolean;
  teamName: string;
  opponentName: string;
  opponentBadge: string;
  teamGoals: number;
  opponentGoals: number;
  competition: string;
  isForfeit: boolean;
};

export interface IPlayerInMatch {
  _id?: string;
  playerId: string | Partial<IPlayer>;
  name: string;
  matchId: string;
  isStarter: boolean;
  matchPosition: TPosition;
  position?: TPosition;
  apps?: number;
  goals: number;
  assists: number;
  conceded: number;
  pensScored: number;
  pensMissed: number;
  pensSaved: number;
  ownGoals: number;
  yellowCards: number;
  mvp: boolean;
  redCard: boolean;
  cleanSheet: boolean;
}

export interface IPlayerStats {
  apps: number;
  goals: number;
  assists: number;
  conceded: number;
  pensScored: number;
  pensMissed: number;
  pensSaved: number;
  ownGoals: number;
  yellowCards: number;
  mvp: number;
  redCard: number;
  cleanSheet: number;
  wins: number;
  draws: number;
  defeats: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  gamesWithGoal: number;
  gamesWithAssist: number;
  gamesWithGoalAndAssist: number;
  gamesWithGoalOrAssist: number;
}

export interface IMatch {
  _id: string;
  teamId: string;
  date: string;
  competitionId: string;
  seasonId: string;
  opponentId: string;
  teamGoals: number;
  opponentGoals: number;
  isHome: boolean;
  leaguePosition: number;
  cupRound: string;
  isForfeit: boolean;
  matchPlayers: Partial<IPlayerInMatch>[];
}

export interface ITempMatch extends IMatch {
  teamName: string;
  opponentName: string;
  competition: ICompetition | null;
}

interface IMatchPlayer extends Omit<IPlayerInMatch, 'playerId'> {
  playerId: Pick<IPlayer, '_id' | 'name' | 'position'>;
}

export type MatchStatsKeys = keyof IMatch;

export interface IMatchResponse
  extends Omit<IMatch, 'teamId' | 'opponentId' | 'matchPlayers' | 'competitionId'> {
  opponentId: string | ITeam;
  teamId: string | ITeam;
  competitionId: string | ICompetition;
  matchPlayers: IMatchPlayer[];
}

export interface IMatchStats {
  total: number;
  wins: number;
  draws: number;
  defeats: number;
  scored: number;
  conceded: number;
  difference: number;
  teamAvg: number;
  oppAvg: number;
}

export interface IMostGoalsInMatch {
  matchId: string;
  player: string;
  date: string;
  opponentName: string;
  teamGoals: number;
  opponentGoals: number;
  total: number;
}

export interface IPlayerMatchRecords {
  maxGoals: number;
  maxAssists: number;
  maxCombined: number;
}

export interface IPlayerRecordMatches {
  _id: string;
  date: string;
  opponent: string;
  teamGoals: number;
  opponentGoals: number;
}

export interface IOpponentTable {
  _id: string;
  isActive: boolean;
  opponentName: string;
  opponentBadge: string;
  total: number;
  wins: number;
  draws: number;
  losses: number;
  totalGoalsScored: number;
  totalGoalsConceded: number;
  totalGoalDifference: number;
}

export interface IPlayerVsStats {
  opponentId: string;
  opponent: string;
  opponentBadge: string;
  matches: number;
  goals: number;
  assists: number;
  conceded: number;
}
