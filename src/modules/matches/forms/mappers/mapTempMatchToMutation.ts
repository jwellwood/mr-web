import { Add_MatchMutationVariables } from '../../graphql/ADD_MATCH.generated';
import { ITempMatch, ITempMatchPlayers } from '../../types';
import { mapTempPlayersToMutation } from './mapTempPlayersToMutation';

const toMatchDecision = (
  value: ITempMatch['decision']
): Add_MatchMutationVariables['decision'] | undefined => {
  if (value === 'NORMAL_TIME' || value === 'EXTRA_TIME' || value === 'PENALTIES') {
    return value;
  }
  return undefined;
};

const toWinnerSide = (
  value: ITempMatch['winnerSide']
): Add_MatchMutationVariables['winnerSide'] | undefined => {
  if (value === 'HOME' || value === 'AWAY') {
    return value;
  }
  return undefined;
};

export const mapTempMatchToMutation = (
  teamId: string,
  match: ITempMatch,
  players: ITempMatchPlayers[]
): Add_MatchMutationVariables => {
  const variables: Add_MatchMutationVariables = {
    teamId,
    opponentId: match.opponentId!,
    competitionId: match.competitionId!,
    date: match.date!,
    opponentGoals: match.opponentGoals!,
    teamGoals: match.teamGoals!,
    isHome: match.isHome!,
    isForfeit: match.isForfeit!,
    decision: toMatchDecision(match.decision),
    winnerSide: toWinnerSide(match.winnerSide),
    seasonId: match.seasonId,
    matchPlayers: mapTempPlayersToMutation(players),
  };

  return variables;
};
