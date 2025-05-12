export interface ITrophy {
  _id?: string;
  teamId: string;
  name: string;
  seasonId: string;
  year?: string;
  isWinner: boolean;
  isFinal: boolean;
  opponentId?: string;
  comment?: string;
}

export interface ITrophyResponse extends Omit<ITrophy, 'opponentId' | 'seasonId'> {
  opponent: string;
  season: string;
}

export interface ITrophyTotals {
  total: number;
  winner: number;
  final: number;
}
