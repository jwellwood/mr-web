export interface ITempMatch {
  _id: string;
  date: string; // > needs to be string in redux, but Date in form
  isHome: boolean;
  teamGoals: number;
  opponentGoals: number;
  leaguePosition: number | null;
  isForfeit: boolean;
  seasonId: string;
  competitionId: string;
  competitionName: string;
  teamId: string;
  teamName: string;
  teamBadgeUrl: string | null;
  opponentId: string;
  opponentName: string;
  opponentBadgeUrl: string | null;
}

export interface ITempMatchPlayers {
  playerName: string;
  playerId: string;
  matchPosition: string;
  isStarter: boolean;
  goals: number;
  assists: number;
  pensScored: number;
  pensMissed: number;
  pensSaved: number;
  yellowCards: number;
  redCard: boolean;
  conceded: number;
  ownGoals: number;
  cleanSheet: boolean;
  mvp: boolean;
}
