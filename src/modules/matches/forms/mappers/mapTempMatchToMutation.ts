import { Add_MatchMutationVariables } from '../../graphql/ADD_MATCH.generated';
import { ITempMatch, ITempMatchPlayers } from '../../types';
import { mapTempPlayersToMutation } from './mapTempPlayersToMutation';

export const mapTempMatchToMutation = (
  teamId: string,
  match: ITempMatch,
  players: ITempMatchPlayers[]
): Add_MatchMutationVariables => {
  return {
    teamId: teamId!,
    opponentId: match.opponentId!,
    competitionId: match.competitionId!,
    date: match.date!,
    opponentGoals: match.opponentGoals!,
    teamGoals: match.teamGoals!,
    isHome: match.isHome!,
    isForfeit: match.isForfeit!,
    leaguePosition: match.leaguePosition,
    seasonId: match.seasonId,
    matchPlayers: mapTempPlayersToMutation(players),
  };
};
