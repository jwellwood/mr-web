export interface ITrophy {
  _id?: string;
  teamId: string;
  name: string;
  seasonId: string;
  year: Date;
  isWinner: boolean;
  isFinal: boolean;
  opponent?: string;
  comment?: string;
}

export interface ITrophyResponse extends Omit<ITrophy, 'opponentId' | 'seasonId'> {
  season: string;
}

export interface ITrophyTotals {
  total: number;
  winner: number;
  final: number;
}
