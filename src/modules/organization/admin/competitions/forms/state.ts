import type { CompetitionFormData } from './validation';

export const initialCompetitionState: CompetitionFormData = {
  name: '',
  competitionType: '',
  isActive: true,
  matchMinutes: 0,
  playersPerTeam: 0,
};
