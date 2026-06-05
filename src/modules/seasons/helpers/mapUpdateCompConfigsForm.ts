import { isCupCompetitionType, TTiebreaker } from '../constants';
import { UpdateCompConfigFormData } from '../forms/competition-configs/schema';
import { Update_Competition_ConfigsMutationVariables } from '../graphql/UPDATE_COMP_CONFIGS.generated';
import { CompetitionConfig } from './mapOrgSeasonForm';

export const mapCompConfigToForm = (
  config: CompetitionConfig,
  competitionType?: string | null
): UpdateCompConfigFormData => {
  const isCup = isCupCompetitionType(competitionType);
  return {
    rounds: config.rounds ?? undefined,
    splitIndexes: config.splitIndexes ?? undefined,
    relegationPositions: config.relegationPositions ?? undefined,
    promotionPositions: config.promotionPositions ?? undefined,
    priority: config.priority ?? undefined,
    tiebreaker: config.tiebreaker ?? (isCup ? TTiebreaker.PENALTIES : TTiebreaker.GOAL_DIFFERENCE),
  };
};

export const mapFormToUpdateCompConfig = (
  formData: UpdateCompConfigFormData,
  orgId: string,
  seasonId: string,
  competitionId: string,
  competitionType?: string | null
): Update_Competition_ConfigsMutationVariables => {
  const isCup = isCupCompetitionType(competitionType);
  return {
    orgId,
    seasonId,
    competitionId,
    rounds: formData.rounds,
    splitIndexes: isCup ? undefined : formData.splitIndexes,
    relegationPositions: isCup ? undefined : formData.relegationPositions,
    promotionPositions: isCup ? undefined : formData.promotionPositions,
    priority: formData.priority,
    tiebreaker:
      formData.tiebreaker || (isCup ? TTiebreaker.PENALTIES : TTiebreaker.GOAL_DIFFERENCE),
  };
};
