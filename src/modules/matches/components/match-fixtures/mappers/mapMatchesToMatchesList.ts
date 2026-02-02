import { IMatchesListMatch } from '../../../../../components';
import { T_FETCH_MATCHES } from '../../../types';

export const mapMatchesToMatchesList = (
  matches?: T_FETCH_MATCHES['matches']
): IMatchesListMatch[] => {
  if (!matches?.length) return [];
  return matches?.map(match => ({
    _id: match._id,
    date: match.date,
    competition: match.competition,
    teamGoals: match.teamGoals,
    opponentGoals: match.opponentGoals,
    opponentName: match.opponentName,
    opponentBadge: match.opponentBadge || undefined,
    isHome: match.isHome,
  }));
};
