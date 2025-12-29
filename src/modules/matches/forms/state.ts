import { POSITIONS } from '../../../constants';
import { IMatch, IPlayerInMatch } from '../types';

export const initialMatchState = {
  opponentId: '',
  competitionId: '',
  seasonId: '',
  date: new Date().toString(),
  isHome: true,
  teamGoals: 0,
  opponentGoals: 0,
  leaguePosition: 1,
  cupRound: '',
  matchPlayers: [],
} as const satisfies Partial<IMatch>;

export const initPlayerInMatch = {
  name: '',
  isStarter: true,
  minutes: 0,
  goals: 0,
  assists: 0,
  ownGoals: 0,
  conceded: 0,
  position: POSITIONS.NONE,
  matchPosition: POSITIONS.NONE,
  pensScored: 0,
  pensMissed: 0,
  pensSaved: 0,
  cleanSheet: false,
  mvp: false,
  yellowCards: 0,
  redCard: false,
} as const satisfies Omit<IPlayerInMatch, 'matchId' | 'playerId'>;
