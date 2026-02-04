import { IMatchesStatsTable } from '../../../../components';
import { T_FETCH_PLAYER_MATCHES_BY_OPPONENT } from '../../types';

export const mapMatchesToMatchStats = (
  matches: T_FETCH_PLAYER_MATCHES_BY_OPPONENT['matches']
): IMatchesStatsTable => {
  const played = matches.length;
  const wins = matches.filter(match => match.teamGoals > match.opponentGoals).length;
  const draws = matches.filter(match => match.teamGoals === match.opponentGoals).length;
  const defeats = matches.filter(match => match.teamGoals < match.opponentGoals).length;
  const goalsFor = matches.reduce((sum, match) => sum + match.teamGoals, 0);
  const goalsAgainst = matches.reduce((sum, match) => sum + match.opponentGoals, 0);
  const difference = goalsFor - goalsAgainst;

  if (played > 0) {
    return {
      played,
      wins,
      draws,
      defeats,
      goalsFor,
      goalsAgainst,
      difference,
    };
  }
  return {
    played: 0,
    wins: 0,
    draws: 0,
    defeats: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    difference: 0,
  };
};
