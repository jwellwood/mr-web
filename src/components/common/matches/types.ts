export interface IMatchesAveragesStats {
  total: number;
  wins: number;
  draws: number;
  defeats: number;
  teamAvg: number;
  oppAvg: number;
  difference: number;
}

export interface IMatchesListMatch {
  _id: string;
  date: string;
  competition: string;
  teamGoals: number;
  opponentGoals: number;
  opponentName: string;
  isHome: boolean;
  isForfeit?: boolean;
  opponentBadge?: string;
}

export interface IMatchesStatsTable {
  played: number;
  wins: number;
  draws: number;
  defeats: number;
  goalsFor: number;
  goalsAgainst: number;
  difference: number;
}
