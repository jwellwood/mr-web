import type { IPlayer } from './player';
import { TPosition } from '../modules/players/constants.ts';

export interface IPlayerInMatch {
  _id?: string;
  playerId: string | Partial<IPlayer>;
  name: string;
  matchId: string;
  isStarter: boolean;
  matchPosition: TPosition;
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
