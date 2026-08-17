import type { CompetitionConfigInput } from '../../../types/__generated__/graphql';
import { isCupCompetitionType, TTiebreaker } from '../constants';
import { UpdateCompConfigFormData } from '../forms/competition-configs/schema';
import { CompetitionConfig } from './mapOrgSeasonForm';

export const mapCompConfigToForm = (
  config: CompetitionConfig,
  competitionType?: string | null
): UpdateCompConfigFormData => {
  const isCup = isCupCompetitionType(competitionType);
  return {
    rounds: config.rounds ?? 0,
    splitIndexes: config.splitIndexes ?? undefined,
    relegationPositions: config.relegationPositions ?? undefined,
    promotionPositions: config.promotionPositions ?? undefined,
    priority: config.priority ?? undefined,
    tiebreaker: config.tiebreaker ?? (isCup ? TTiebreaker.PENALTIES : TTiebreaker.GOAL_DIFFERENCE),
    teams:
      config.teams?.map(t => ({
        teamId: t.teamId._id,
        startingPoints: t.startingPoints ?? 0,
      })) ?? [],
  };
};

export const mapFormToCompConfigInput = (
  formData: UpdateCompConfigFormData,
  competitionId: string,
  competitionType?: string | null
): CompetitionConfigInput => {
  const isCup = isCupCompetitionType(competitionType);
  return {
    competitionId,
    rounds: Number(formData?.rounds),
    splitIndexes: isCup ? undefined : formData.splitIndexes,
    relegationPositions: isCup ? undefined : formData.relegationPositions,
    promotionPositions: isCup ? undefined : formData.promotionPositions,
    priority: formData.priority,
    tiebreaker:
      formData.tiebreaker || (isCup ? TTiebreaker.PENALTIES : TTiebreaker.GOAL_DIFFERENCE),
    teams:
      formData.teams?.map(t => ({
        teamId: t.teamId,
        startingPoints: t.startingPoints,
      })) ?? undefined,
  };
};

export const mapCompConfigToInput = (
  config: CompetitionConfig,
  competitionType?: string | null
): CompetitionConfigInput => {
  const isCup = isCupCompetitionType(competitionType);
  return {
    competitionId: config.competitionId._id,
    rounds: config.rounds,
    splitIndexes: isCup ? undefined : config.splitIndexes,
    relegationPositions: isCup ? undefined : config.relegationPositions,
    promotionPositions: isCup ? undefined : config.promotionPositions,
    priority: config.priority,
    tiebreaker: config.tiebreaker || (isCup ? TTiebreaker.PENALTIES : TTiebreaker.GOAL_DIFFERENCE),
    teams:
      config.teams?.map(team => ({
        teamId: team.teamId._id,
        startingPoints: team.startingPoints,
      })) ?? undefined,
  };
};
