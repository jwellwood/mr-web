import type { ResultFormData } from '../forms/validation';
import { T_FETCH_RESULT } from '../graphql';
import type { Add_ResultMutationVariables } from '../graphql/ADD_RESULT.generated';
import type { Edit_ResultMutationVariables } from '../graphql/EDIT_RESULT.generated';

export const mapFormToAddResult = (
  formData: ResultFormData,
  orgId: string,
  orgSeasonIdFromParams?: string
): Add_ResultMutationVariables => {
  return {
    orgId,
    orgSeasonId: formData.orgSeasonId || orgSeasonIdFromParams || 'default',
    competitionId: formData.competitionId || '',
    date: formData.date ? formData.date.toISOString() : new Date().toISOString(),
    gameWeek: Number(formData.gameWeek) || 0,
    homeTeam: formData.homeTeam || '',
    awayTeam: formData.awayTeam || '',
    homeGoals: Number(formData.homeGoals) || 0,
    awayGoals: Number(formData.awayGoals) || 0,
    isForfeit: formData.isForfeit || false,
    isComplete: formData.isComplete || false,
  };
};

export const mapResultToForm = (result: T_FETCH_RESULT['result']): ResultFormData => {
  return {
    date: result.date ? new Date(result.date) : new Date(),
    gameWeek: result.gameWeek ?? 0,
    competitionId: result.competitionId?._id ?? '',
    orgSeasonId: result.orgSeasonId?._id ?? '',
    homeTeam: result.homeTeam?._id ?? '',
    awayTeam: result.awayTeam?._id ?? '',
    homeGoals: result.homeGoals ?? 0,
    awayGoals: result.awayGoals ?? 0,
    isForfeit: result.isForfeit ?? false,
    isComplete: result.isComplete ?? false,
  } as ResultFormData;
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
    gameWeek: Number(formData.gameWeek) || 0,
    homeTeam: formData.homeTeam || '',
    awayTeam: formData.awayTeam || '',
    homeGoals: Number(formData.homeGoals) || 0,
    awayGoals: Number(formData.awayGoals) || 0,
    isForfeit: formData.isForfeit || false,
    isComplete: formData.isComplete || false,
  };
};
