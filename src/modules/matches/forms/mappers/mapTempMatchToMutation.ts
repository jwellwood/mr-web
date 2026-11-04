import { T_ADD_MATCH_VARIABLES } from '../../graphql';
import { ITempMatch, ITempMatchPlayers } from '../../types';
import { mapTempPlayersToMutation } from './mapTempPlayersToMutation';

const toMatchDecision = (
  value: ITempMatch['decision']
): T_ADD_MATCH_VARIABLES['decision'] | undefined => {
  if (value === 'NORMAL_TIME' || value === 'EXTRA_TIME' || value === 'PENALTIES') {
    return value;
  }
  return undefined;
};

const toWinnerSide = (
  value: ITempMatch['winnerSide']
): T_ADD_MATCH_VARIABLES['winnerSide'] | undefined => {
  if (value === 'HOME' || value === 'AWAY') {
    return value;
  }
  return undefined;
};

export const mapTempMatchToMutation = (
  teamId: string,
  match: ITempMatch,
  players: ITempMatchPlayers[]
): T_ADD_MATCH_VARIABLES => {
  const variables: T_ADD_MATCH_VARIABLES = {
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
