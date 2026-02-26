import type { UpdateCompConfigFormData } from '../../tables/forms/competition-configs/validation';
import type { Update_Competition_ConfigsMutationVariables } from '../../tables/graphql/UPDATE_COMP_CONFIGS.generated';
import { CompetitionConfig } from './mapOrgSeasonForm';

export const mapCompConfigToForm = (config: CompetitionConfig): UpdateCompConfigFormData => {
  return {
    rounds: config.rounds ?? undefined,
    splitIndexes: config.splitIndexes ?? undefined,
    relegationPositions: config.relegationPositions ?? undefined,
    promotionPositions: config.promotionPositions ?? undefined,
    priority: config.priority ?? undefined,
  };
};

export const mapFormToUpdateCompConfig = (
  formData: UpdateCompConfigFormData,
  orgId: string,
  seasonId: string,
  competitionId: string
): Update_Competition_ConfigsMutationVariables => {
  return {
    orgId,
    seasonId,
    competitionId,
    rounds: formData.rounds,
    splitIndexes: formData.splitIndexes,
    relegationPositions: formData.relegationPositions,
    promotionPositions: formData.promotionPositions,
    priority: formData.priority,
  };
};
