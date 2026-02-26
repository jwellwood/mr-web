import type { OrgSeasonFormData } from '../forms/validation';
import type { T_FETCH_ORG_SEASON } from '../graphql';
import type { Add_Org_SeasonMutationVariables } from '../graphql/ADD_ORG_SEASON.generated';
import type { Edit_Org_SeasonMutationVariables } from '../graphql/EDIT_ORG_SEASON.generated';

export type CompetitionConfig = NonNullable<
  T_FETCH_ORG_SEASON['orgSeason']['competitionConfigs']
>[number];

export const mapFormToAddOrgSeason = (
  formData: OrgSeasonFormData,
  orgId: string
): Add_Org_SeasonMutationVariables => {
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
): Edit_Org_SeasonMutationVariables => {
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
