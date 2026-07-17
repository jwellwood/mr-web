import { ResultFormData } from '../forms/result/schema';
import { T_FETCH_RESULT } from '../graphql';
import type { Add_ResultMutationVariables } from '../graphql/ADD_RESULT.generated';
import type { Edit_ResultMutationVariables } from '../graphql/EDIT_RESULT.generated';

type TResultDecision = 'NORMAL_TIME' | 'EXTRA_TIME' | 'PENALTIES';
type TWinnerSide = 'HOME' | 'AWAY';

const toResultDecision = (value: ResultFormData['decision']): TResultDecision | undefined => {
  if (value === 'NORMAL_TIME' || value === 'EXTRA_TIME' || value === 'PENALTIES') {
    return value;
  }
  return undefined;
};

const toWinnerSide = (value: ResultFormData['winnerSide']): TWinnerSide | undefined => {
  if (value === 'HOME' || value === 'AWAY') {
    return value;
  }
  return undefined;
};

export const mapFormToAddResult = (
  formData: ResultFormData,
  orgId: string,
  orgSeasonIdFromParams?: string
): Add_ResultMutationVariables => {
  return {
    orgId,
    orgSeasonId: orgSeasonIdFromParams || 'default',
    competitionId: formData.competitionId || '',
    date: formData.date ? formData.date.toISOString() : new Date().toISOString(),
    gameWeek: Number(formData.gameWeek) || 0,
    homeTeam: formData.homeTeam || '',
    awayTeam: formData.awayTeam || '',
    homeGoals: Number(formData.homeGoals) || 0,
    awayGoals: Number(formData.awayGoals) || 0,
    kickoffTime: formData.kickoffTime || undefined,
    decision: toResultDecision(formData.decision),
    winnerSide: toWinnerSide(formData.winnerSide),
    isForfeit: formData.isForfeit || false,
    isComplete: formData.isComplete || false,
    isBye: formData.isBye || false,
  };
};

export const mapResultToForm = (result: T_FETCH_RESULT['result']): ResultFormData => {
  return {
    date: result.date ? new Date(result.date) : new Date(),
    kickoffTime: result.kickoffTime || null,
    gameWeek: result.gameWeek ?? 0,
    competitionId: result.competitionId?._id ?? '',
    orgSeasonId: result.orgSeasonId?._id ?? '',
    homeTeam: result.homeTeam?._id ?? '',
    awayTeam: result.awayTeam?._id ?? '',
    homeGoals: result.homeGoals ?? 0,
    awayGoals: result.awayGoals ?? 0,
    decision: result.decision ?? null,
    winnerSide: result.winnerSide ?? null,
    isForfeit: result.isForfeit ?? false,
    isComplete: result.isComplete ?? false,
    isBye: result.isBye ?? false,
  };
};

export const mapFormToEditResult = (
  formData: ResultFormData,
  orgId: string,
  resultId: string
): Edit_ResultMutationVariables => {
  return {
    orgId,
    resultId,
    orgSeasonId: formData.orgSeasonId || '',
    competitionId: formData.competitionId || '',
    date: formData.date ? formData.date.toISOString() : new Date().toISOString(),
    kickoffTime: formData.kickoffTime || null,
    gameWeek: Number(formData.gameWeek) || 0,
    homeTeam: formData.homeTeam || '',
    awayTeam: formData.awayTeam || '',
    homeGoals: Number(formData.homeGoals) || 0,
    awayGoals: Number(formData.awayGoals) || 0,
    isForfeit: formData.isForfeit || false,
    isComplete: formData.isComplete || false,
    isBye: formData.isBye || false,
    decision: toResultDecision(formData.decision),
    winnerSide: toWinnerSide(formData.winnerSide),
  };
};
