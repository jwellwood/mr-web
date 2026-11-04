import { T_ADD_MATCH_VARIABLES } from '../../graphql';
import { ITempMatchPlayers } from '../../types';

export const mapTempPlayersToMutation = (
  tempPlayers: ITempMatchPlayers[]
): T_ADD_MATCH_VARIABLES['matchPlayers'] => {
  return tempPlayers.map(player => ({
    playerId: player.playerId,
    isStarter: player.isStarter,
    matchPosition: player.matchPosition,
    goals: player.goals,
    assists: player.assists,
    conceded: player.conceded,
    cleanSheet: player.cleanSheet,
    ownGoals: player.ownGoals,
    pensScored: player.pensScored,
    pensMissed: player.pensMissed,
    pensSaved: player.pensSaved,
    yellowCards: player.yellowCards,
    redCard: player.redCard,
    mvp: player.mvp,
  }));
};
