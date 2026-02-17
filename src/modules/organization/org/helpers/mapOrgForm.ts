import type { OrganizationFormData } from '../forms/validation';
import type { Add_OrgMutationVariables } from '../graphql/ADD_ORG.generated';
import type { Fetch_OrgQuery } from '../graphql/FETCH_ORG.generated';

export const mapFormToOrg = (formData: OrganizationFormData): Add_OrgMutationVariables => {
  return {
    name: formData.name.trim(),
    website: formData.website || undefined,
    yearFounded: formData.yearFounded ? formData.yearFounded.toISOString() : undefined,
    city: formData.city || undefined,
    country: formData.country || undefined,
  };
};

export const mapOrgToForm = (org: Fetch_OrgQuery['org']): OrganizationFormData => {
  return {
    name: org.name ?? '',
    website: org.website ?? '',
    yearFounded: org.yearFounded ? new Date(org.yearFounded) : new Date(),
    city: org.city ?? '',
    country: org.country ?? '',
  } as OrganizationFormData;
};
