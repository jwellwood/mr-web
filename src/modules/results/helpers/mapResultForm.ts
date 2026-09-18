import type { MatchRow } from '../forms/batch-result/BatchResultForm';
import { BatchResultFormData } from '../forms/batch-result/schema';
import { ResultFormData } from '../forms/result/schema';
import { T_FETCH_RESULT, T_FETCH_RESULTS } from '../graphql';
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

export const mapResultsToBatchForm = (results: T_FETCH_RESULTS['results']): BatchResultFormData => {
  const first = results[0];

  return {
    date: first.date ? new Date(first.date) : new Date(),
    kickoffTime: first.kickoffTime || null,
    gameWeek: first.gameWeek ?? 0,
    competitionId: first.competitionId?._id ?? '',
    orgSeasonId: first.orgSeasonId?._id ?? '',
    matches: results.map(result => ({
      _id: result._id,
      homeTeam: result.homeTeam?._id ?? '',
      awayTeam: result.awayTeam?._id ?? '',
      homeGoals: result.homeGoals ?? 0,
      awayGoals: result.awayGoals ?? 0,
      kickoffTime: result.kickoffTime || null,
      isForfeit: result.isForfeit ?? false,
      isBye: result.isBye ?? false,
    })),
  };
};

export const getGameweekChanges = (
  originalResults: T_FETCH_RESULTS['results'],
  formData: BatchResultFormData
): { toAdd: MatchRow[]; toUpdate: { _id: string; match: MatchRow }[]; toDelete: string[] } => {
  const validMatches = (formData.matches as MatchRow[]).filter(
    m => m.homeTeam && (m.awayTeam || m.isBye)
  );

  const toAdd = validMatches.filter(m => !m._id);
  const toUpdate = validMatches
    .filter(m => m._id && originalResults.some(r => r._id === m._id))
    .map(m => ({ _id: m._id as string, match: m }));

  const submittedIds = new Set(validMatches.map(m => m._id).filter(Boolean));
  const toDelete = originalResults.filter(r => !submittedIds.has(r._id)).map(r => r._id);

  return { toAdd, toUpdate, toDelete };
};
