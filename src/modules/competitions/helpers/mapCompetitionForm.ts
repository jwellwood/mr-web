import type { CompetitionFormData } from '../forms/schema';
import type {
  T_ADD_COMPETITION_VARIABLES,
  T_EDIT_COMPETITION_VARIABLES,
  T_FETCH_COMPETITION,
} from '../graphql';

export const mapFormToAddCompetition = (
  formData: CompetitionFormData,
  orgId: string
): T_ADD_COMPETITION_VARIABLES => {
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
): T_EDIT_COMPETITION_VARIABLES => {
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
  competition: T_FETCH_COMPETITION['competition']
): CompetitionFormData => {
  return {
    name: competition.name ?? '',
    competitionType: competition.competitionType ?? '',
    isActive: Boolean(competition.isActive),
    matchMinutes: competition.matchMinutes ?? 0,
    playersPerTeam: competition.playersPerTeam ?? 0,
  } as CompetitionFormData;
};
