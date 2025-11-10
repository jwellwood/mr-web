import { ReactElement } from 'react';
import { IPlayer } from '../../types';
import { ICompetition } from '../organization/types';
import { TPosition } from '../players/constants';
import { ITeam } from '../team/types';

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
  matchPosition: TPosition | ReactElement;
  position?: TPosition;
  apps?: number;
  minutes: number;
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
  minutes: number;
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
