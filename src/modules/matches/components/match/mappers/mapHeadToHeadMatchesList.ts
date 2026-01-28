import { IMatchesListMatch } from '../../../../../components';
import { T_FETCH_MATCHES_BY_OPPONENT } from '../../../types';

export const mapHeadToHeadMatchesList = (
  matches?: T_FETCH_MATCHES_BY_OPPONENT['matches']
): IMatchesListMatch[] => {
  if (!matches?.length) return [];
  return matches?.map(match => ({
    _id: match._id,
    date: match.date,
    competition: match.competition,
    teamGoals: match.teamGoals,
    opponentGoals: match.opponentGoals,
    opponentName: match.opponentName,
    isHome: match.isHome,
  }));
};
