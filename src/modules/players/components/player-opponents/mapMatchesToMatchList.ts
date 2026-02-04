import { IMatchesListMatch } from '../../../../components';
import { T_FETCH_PLAYER_MATCHES_BY_OPPONENT } from '../../types';

export const mapMatchesToMatchList = (
  matches: T_FETCH_PLAYER_MATCHES_BY_OPPONENT['matches']
): IMatchesListMatch[] => {
  return matches.map(match => ({
    opponentGoals: match.opponentGoals,
    teamGoals: match.teamGoals,
    date: match.date,
    _id: match._id,
    opponentName: match.opponent,
    isHome: match.isHome,
  }));
};
