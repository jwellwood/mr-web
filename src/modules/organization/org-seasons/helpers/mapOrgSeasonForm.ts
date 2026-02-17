import type { OrgSeasonFormData } from '../forms/validation';
import type { Add_Org_SeasonMutationVariables } from '../graphql/ADD_ORG_SEASON.generated';
import type { Edit_Org_SeasonMutationVariables } from '../graphql/EDIT_ORG_SEASON.generated';
import type { Fetch_Org_SeasonQuery } from '../graphql/FETCH_ORG_SEASON.generated';

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
  };
};

export const mapOrgSeasonToForm = (
  season: Fetch_Org_SeasonQuery['orgSeason']
): OrgSeasonFormData => {
  return {
    yearStarted: season.yearStarted ? new Date(season.yearStarted) : new Date(),
    yearEnded: season.yearEnded ? new Date(season.yearEnded) : new Date(),
    isCurrent: Boolean(season.isCurrent),
    comment: season.comment ?? '',
  } as OrgSeasonFormData;
};
