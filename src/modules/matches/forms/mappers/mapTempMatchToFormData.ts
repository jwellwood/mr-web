import { ITempMatch } from '../../types';
import { AddMatchDetailsFormValues } from '../add-match-details/schema';

const toFormDecision = (value: ITempMatch['decision']): AddMatchDetailsFormValues['decision'] => {
  if (value === 'NORMAL_TIME' || value === 'EXTRA_TIME' || value === 'PENALTIES') {
    return value;
  }
  return null;
};

const toFormWinnerSide = (
  value: ITempMatch['winnerSide']
): AddMatchDetailsFormValues['winnerSide'] => {
  if (value === 'HOME' || value === 'AWAY') {
    return value;
  }
  return null;
};

export const mapTempMatchToFormData = (tempMatch: ITempMatch): AddMatchDetailsFormValues => {
  return {
    seasonId: tempMatch.seasonId,
    opponentId: tempMatch.opponentId,
    competitionId: tempMatch.competitionId,
    date: new Date(tempMatch.date),
    isHome: tempMatch.isHome,
    teamGoals: tempMatch.teamGoals,
    opponentGoals: tempMatch.opponentGoals,
    decision: toFormDecision(tempMatch.decision),
    winnerSide: toFormWinnerSide(tempMatch.winnerSide),
    isForfeit: tempMatch.isForfeit,
  };
};
