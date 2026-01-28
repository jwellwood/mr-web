import { T_FETCH_MATCHES_RECORDS } from '../../../types';

export const mapMatchRecordsMatchesToMatchesList = (
  matches?: T_FETCH_MATCHES_RECORDS['stats'][keyof T_FETCH_MATCHES_RECORDS['stats']]
) => {
  if (!matches?.length) return [];
  return matches.map(match => ({
    _id: match._id,
    date: match.date,
    competition: '',
    teamGoals: match.teamGoals,
    opponentGoals: match.opponentGoals,
    opponentName: match.opponentName,
    isHome: match.isHome,
  }));
};
