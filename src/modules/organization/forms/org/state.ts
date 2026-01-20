import type { OrganizationFormData } from './validation';

export const initialOrgDetailsState: OrganizationFormData = {
  name: '',
  website: '',
  yearFounded: new Date(),
  city: '',
  country: '',
};
