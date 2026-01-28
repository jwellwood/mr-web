import { ITempMatch, T_FETCH_MATCH } from '../../types';

export const mapFetchedMatchToTempMatch = (match: T_FETCH_MATCH['match']): ITempMatch => {
  return {
    _id: match._id,
    date: match.date,
    isHome: match.isHome,
    teamGoals: match.teamGoals,
    opponentGoals: match.opponentGoals,
    leaguePosition: match.leaguePosition,
    isForfeit: match.isForfeit,
    seasonId: match.seasonId._id,
    competitionId: match.competitionId._id,
    competitionName: match.competitionId.name,
    teamId: match.teamId._id,
    teamName: match.teamId.teamName,
    teamBadgeUrl: match.teamId.teamBadge ? match.teamId.teamBadge.url : null,
    opponentId: match.opponentId._id,
    opponentName: match.opponentId.teamName,
    opponentBadgeUrl: match.opponentId.teamBadge ? match.opponentId.teamBadge.url : null,
  };
};
