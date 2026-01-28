import { ITempMatch } from '../../types';
import { AddMatchDetailsFormValues } from '../add-match-details/validation';

export const mapTempMatchToFormData = (tempMatch: ITempMatch): AddMatchDetailsFormValues => {
  return {
    seasonId: tempMatch.seasonId,
    opponentId: tempMatch.opponentId,
    competitionId: tempMatch.competitionId,
    date: new Date(tempMatch.date),
    isHome: tempMatch.isHome,
    teamGoals: tempMatch.teamGoals,
    opponentGoals: tempMatch.opponentGoals,
    leaguePosition: tempMatch.leaguePosition,
    isForfeit: tempMatch.isForfeit,
  } as AddMatchDetailsFormValues;
};
