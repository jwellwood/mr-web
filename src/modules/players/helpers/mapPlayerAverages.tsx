import { IMatchesAveragesStats } from '../../../components';
import { getAvg } from '../../../utils/helpers';
import { T_FETCH_PLAYER_STATS } from '../types';

export const mapPlayerAverages = (
  player?: T_FETCH_PLAYER_STATS['player']
): IMatchesAveragesStats => {
  const genValue = (value?: number | null) => value || 0;
  return {
    total: genValue(player?.apps),
    wins: genValue(player?.wins),
    draws: genValue(player?.draws),
    defeats: genValue(player?.defeats),
    teamAvg: +getAvg(genValue(player?.goalsFor), genValue(player?.apps), 2) || 0,
    oppAvg: +getAvg(genValue(player?.goalsAgainst), genValue(player?.apps), 2) || 0,
    difference: genValue(genValue(player?.goalsFor) - genValue(player?.goalsAgainst)),
  };
};
