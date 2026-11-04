import type { OrgSeasonFormData } from '../forms/schema';
import {
  T_ADD_ORG_SEASON_VARIABLES,
  T_EDIT_ORG_SEASON_VARIABLES,
  T_FETCH_ORG_SEASON,
} from '../graphql';

export type CompetitionConfig = NonNullable<
  T_FETCH_ORG_SEASON['orgSeason']['competitionConfigs']
>[number];

export const mapFormToAddOrgSeason = (
  formData: OrgSeasonFormData,
  orgId: string
): T_ADD_ORG_SEASON_VARIABLES => {
  return {
    orgId,
    yearStarted: formData.yearStarted
      ? formData.yearStarted.toISOString()
      : new Date().toISOString(),
    yearEnded: formData.yearEnded ? formData.yearEnded.toISOString() : new Date().toISOString(),
    isCurrent: Boolean(formData.isCurrent),
    teamIds: formData.teamIds,
    competitionIds: formData.competitionIds,
    comment: formData.comment || undefined,
  };
};

export const mapFormToEditOrgSeason = (
  formData: OrgSeasonFormData,
  orgId: string,
  seasonId: string
): T_EDIT_ORG_SEASON_VARIABLES => {
  return {
    orgId,
    seasonId,
    yearStarted: formData.yearStarted
      ? formData.yearStarted.toISOString()
      : new Date().toISOString(),
    yearEnded: formData.yearEnded ? formData.yearEnded.toISOString() : new Date().toISOString(),
    isCurrent: Boolean(formData.isCurrent),
    comment: formData.comment || undefined,
    teamIds: formData.teamIds,
    competitionIds: formData.competitionIds,
  };
};

export const mapOrgSeasonToForm = (season: T_FETCH_ORG_SEASON['orgSeason']): OrgSeasonFormData => {
  return {
    yearStarted: season.yearStarted ? new Date(season.yearStarted) : new Date(),
    yearEnded: season.yearEnded ? new Date(season.yearEnded) : new Date(),
    isCurrent: Boolean(season.isCurrent),
    comment: season.comment ?? '',
    teamIds: season.teamIds.map(team => team._id) || [],
    competitionIds: season.competitionConfigs?.map(comp => comp.competitionId._id) || [],
  } as OrgSeasonFormData;
};
