import type { IPlayer } from './player';
import type { IPlayerInMatch } from './playerInMatch';

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
