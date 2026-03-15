import type { CompetitionFormData } from '../forms/validation';
import type { Add_CompetitionMutationVariables } from '../graphql/ADD_COMPETITION.generated';
import type { Edit_CompetitionMutationVariables } from '../graphql/EDIT_COMPETITION.generated';
import type { Fetch_CompetitionQuery } from '../graphql/FETCH_COMPETITION.generated';

export const mapFormToAddCompetition = (
  formData: CompetitionFormData,
  orgId: string
): Add_CompetitionMutationVariables => {
  return {
    orgId,
    name: formData.name.trim(),
    matchMinutes: Number(formData.matchMinutes) || 0,
    playersPerTeam: Number(formData.playersPerTeam) || 0,
    competitionType: formData.competitionType || '',
    isActive: Boolean(formData.isActive),
  };
};

export const mapFormToEditCompetition = (
  formData: CompetitionFormData,
  orgId: string,
  compId: string
): Edit_CompetitionMutationVariables => {
  return {
    compId,
    orgId,
    name: formData.name.trim(),
    matchMinutes: Number(formData.matchMinutes) || 0,
    playersPerTeam: Number(formData.playersPerTeam) || 0,
    competitionType: formData.competitionType || '',
    isActive: Boolean(formData.isActive),
  };
};

export const mapCompetitionToForm = (
  competition: Fetch_CompetitionQuery['competition']
): CompetitionFormData => {
  return {
    name: competition.name ?? '',
    competitionType: competition.competitionType ?? '',
    isActive: Boolean(competition.isActive),
    matchMinutes: competition.matchMinutes ?? 0,
    playersPerTeam: competition.playersPerTeam ?? 0,
  } as CompetitionFormData;
};
