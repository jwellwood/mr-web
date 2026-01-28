import { ITempMatchPlayers, T_FETCH_MATCH } from '../../types';

export const mapFetchedPlayersToTempPlayers = (
  players: T_FETCH_MATCH['match']['matchPlayers']
): ITempMatchPlayers[] => {
  return players.map(player => ({
    playerName: player.playerId.name,
    playerId: player.playerId._id,
    matchPosition: player.matchPosition || player.playerId.position,
    isStarter: player.isStarter,
    goals: player.goals,
    assists: player.assists,
    pensScored: player.pensScored,
    pensMissed: player.pensMissed,
    pensSaved: player.pensSaved,
    yellowCards: player.yellowCards,
    redCard: player.redCard,
    conceded: player.conceded,
    ownGoals: player.ownGoals,
    cleanSheet: player.cleanSheet,
    mvp: player.mvp,
  }));
};
