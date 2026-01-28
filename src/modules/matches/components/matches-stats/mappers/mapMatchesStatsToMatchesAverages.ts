import { IMatchesAveragesStats } from '../../../../../components';
import { T_FETCH_MATCHES_ALL_TIME_STATS, T_FETCH_MATCHES_STATS } from '../../../types';

export const mapMatchesStatsToMatchesAverages = (
  stats?: T_FETCH_MATCHES_ALL_TIME_STATS['stats'] | T_FETCH_MATCHES_STATS['stats']
): IMatchesAveragesStats => {
  if (!stats?.total) {
    return {
      total: 0,
      wins: 0,
      draws: 0,
      defeats: 0,
      teamAvg: 0,
      oppAvg: 0,
      difference: 0,
    };
  }

  return {
    total: stats.total || 0,
    wins: stats.wins || 0,
    draws: stats.draws || 0,
    defeats: stats.defeats || 0,
    teamAvg: stats.teamAvg || 0,
    oppAvg: stats.oppAvg || 0,
    difference: stats.difference || 0,
  };
};
