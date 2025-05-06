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

export interface IMostGoalsAndAssistsByPlayer {
  maxGoals: number;
  maxAssists: number;
}

export interface IMostGoalsByPlayerMatches {
  _id: string;
  date: string;
  opponent: string;
  teamGoals: number;
  opponentGoals: number;
  total: number;
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
