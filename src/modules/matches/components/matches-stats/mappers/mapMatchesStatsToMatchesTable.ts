import { IMatchesStatsTable } from '../../../../../components';
import { T_FETCH_MATCHES_ALL_TIME_STATS, T_FETCH_MATCHES_STATS } from '../../../types';

export const mapMatchesStatsToMatchesTable = (
  stats?: T_FETCH_MATCHES_ALL_TIME_STATS['stats'] | T_FETCH_MATCHES_STATS['stats']
): IMatchesStatsTable => {
  if (!stats?.total)
    return {
      played: 0,
      wins: 0,
      draws: 0,
      defeats: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      difference: 0,
    };

  const played = stats.total || 0;
  const wins = stats.wins || 0;
  const draws = stats.draws || 0;
  const defeats = stats.defeats || 0;
  const goalsFor = stats.scored || 0;
  const goalsAgainst = stats.conceded || 0;
  const difference = stats.difference || 0;
  return {
    played,
    wins,
    draws,
    defeats,
    goalsFor,
    goalsAgainst,
    difference,
  };
};
