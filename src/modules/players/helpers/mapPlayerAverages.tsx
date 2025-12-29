import { getAvg } from '../../../utils/helpers';
import { IPlayerStats } from '../types';

export const mapPlayerAverages = (player?: IPlayerStats) => {
  return player
    ? {
        total: player.apps,
        wins: player.wins,
        draws: player.draws,
        defeats: player.defeats,
        teamAvg: +getAvg(player.goalsFor, player.apps, 2) || 0,
        oppAvg: +getAvg(player.goalsAgainst, player.apps, 2) || 0,
        scored: player.goalsFor,
        conceded: player.goalsAgainst,
        difference: player.goalsFor - player.goalsAgainst,
      }
    : null;
};
