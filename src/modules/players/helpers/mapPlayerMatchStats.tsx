import { IMatchesStatsTable } from '../../../components';
import { T_FETCH_PLAYER_STATS } from '../types';

export const mapPlayerMatchStats = (
  player?: T_FETCH_PLAYER_STATS['player'] | null
): IMatchesStatsTable => {
  const genValue = (value?: number | null) => value || 0;

  return {
    played: genValue(player?.apps),
    wins: genValue(player?.wins),
    draws: genValue(player?.draws),
    defeats: genValue(player?.defeats),
    goalsFor: genValue(player?.goalsFor),
    goalsAgainst: genValue(player?.goalsAgainst),
    difference: genValue(genValue(player?.goalsFor) - genValue(player?.goalsAgainst)),
  };
};
