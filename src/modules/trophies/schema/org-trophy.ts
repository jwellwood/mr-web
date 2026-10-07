import { z } from 'zod';
import i18n from '../../../i18n/react-i18n';
import { getRequiredFields } from '../../../utils';

export const OrgTrophySchema = z.object({
  competitionId: z.string().min(1, i18n.t('trophies:VALIDATION.COMPETITION_REQUIRED')),
  winningTeamId: z.string().min(1, i18n.t('trophies:VALIDATION.WINNING_TEAM_REQUIRED')),
  runnerUpTeamId: z.string().min(1, i18n.t('trophies:VALIDATION.RUNNER_UP_TEAM_REQUIRED')),
  comment: z.string().optional(),
});

export const orgTrophyRequiredFields = getRequiredFields(OrgTrophySchema);

export type OrgTrophyFormData = z.infer<typeof OrgTrophySchema>;

export const initialOrgTrophyFormState: OrgTrophyFormData = {
  competitionId: '',
  winningTeamId: '',
  runnerUpTeamId: '',
  comment: '',
};
