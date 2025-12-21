import { IImage } from '../../components/avatars/image-avatar/types.ts';
import { TPosition } from './constants';

export interface IPlayer {
  _id: string;
  name: string;
  squadNumber: string;
  position: TPosition;
  image: IImage;
  nationality: string;
  dateOfBirth: string;
  yearJoined: string;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isHallOfFame?: boolean;
  seasonIds?: ISeasonID[];
}

export interface ISeasonID {
  _id: string;
  name: string;
}

export type Streak = {
  length: number;
  startDate: string;
  endDate: string;
};

export type StreakTypes = {
  currentPlayedStreak: Streak;
  currentGoalStreak: Streak;
  currentAssistStreak: Streak;
  currentContributionStreak: Streak;
  playedStreak: Streak;
  goalStreak: Streak;
  assistStreak: Streak;
  contributionStreak: Streak;
};

export type AllPlayerStreaks = {
  playerId: string;
  longestPlayedStreak: number;
};

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
