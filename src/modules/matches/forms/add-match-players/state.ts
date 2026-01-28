import { POSITIONS } from '../../../../constants';
import { AddMatchPlayerStatsFormValues } from '../add-match-player-stats/validation';

export const initPlayerInMatch = {
  isStarter: true,
  goals: 0,
  assists: 0,
  ownGoals: 0,
  conceded: 0,
  matchPosition: POSITIONS.NONE,
  pensScored: 0,
  pensMissed: 0,
  pensSaved: 0,
  cleanSheet: false,
  mvp: false,
  yellowCards: 0,
  redCard: false,
} as const satisfies AddMatchPlayerStatsFormValues;
