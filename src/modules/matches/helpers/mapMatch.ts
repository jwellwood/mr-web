import {IMatch, IPlayerInMatch, ITempMatch} from "../../../types";

export const mapMatch = (
  teamId: string,
  tempMatch: ITempMatch,
  tempPlayers: IPlayerInMatch[]
): Partial<IMatch> => {
  const mappedTempPlayers: Partial<IPlayerInMatch>[] = tempPlayers.map(
    (player) => {
      return {
        playerId: player._id,
        matchPosition: player.matchPosition,
        minutes: +player.minutes,
        isStarter: player.isStarter,
        goals: +player.goals,
        assists: +player.assists,
        ownGoals: +player.ownGoals,
        conceded: +player.conceded,
        pensScored: +player.pensScored,
        pensMissed: +player.pensMissed,
        pensSaved: +player.pensSaved,
        yellowCards: +player.yellowCards,
        redCard: player.redCard,
        mvp: player.mvp,
        cleanSheet: player.cleanSheet,
      };
    }
  );
  const matchToSubmit: Partial<IMatch> = {
    teamId,
    seasonId: tempMatch.seasonId,
    date: tempMatch.date,
    competitionId: tempMatch.competition?._id,
    opponentId: tempMatch.opponentId,
    teamGoals: +tempMatch.teamGoals,
    opponentGoals: +tempMatch.opponentGoals,
    isHome: tempMatch.isHome,
    cupRound: tempMatch.cupRound,
    leaguePosition: +tempMatch.leaguePosition,
    matchPlayers: mappedTempPlayers,
    isForfeit: tempMatch.isForfeit,
  };
  return matchToSubmit;
};
