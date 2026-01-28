import { IMatchesStatsTable } from '../../../../../components';
import { T_FETCH_MATCHES_BY_OPPONENT } from '../../../types';

export const mapHeadToHeadMatchesTable = (
  matches?: T_FETCH_MATCHES_BY_OPPONENT['matches']
): IMatchesStatsTable => {
  if (!matches?.length)
    return {
      played: 0,
      wins: 0,
      draws: 0,
      defeats: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      difference: 0,
    };

  const played = matches.length;
  const wins = matches.filter(match => match.teamGoals > match.opponentGoals).length;
  const draws = matches.filter(match => match.teamGoals === match.opponentGoals).length;
  const defeats = matches.filter(match => match.teamGoals < match.opponentGoals).length;
  const goalsFor = matches.map(match => match.teamGoals).reduce((a, b) => a + b, 0);
  const goalsAgainst = matches.map(match => match.opponentGoals).reduce((a, b) => a + b, 0);
  const difference = goalsFor - goalsAgainst;
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
