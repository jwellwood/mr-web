import { IPlayerStats } from '../../../types';
import { getAvg } from '../../../utils/helpers';

export const mapPlayerAverages = (player: IPlayerStats) => {
  return {
    total: player.apps,
    wins: player.wins,
    draws: player.draws,
    defeats: player.defeats,
    teamAvg: +getAvg(player.goalsFor, player.apps, 2) || 0,
    oppAvg: +getAvg(player.goalsAgainst, player.apps, 2) || 0,
    scored: player.goalsFor,
    conceded: player.goalsAgainst,
    difference: player.goalsFor - player.goalsAgainst,
  };
};
