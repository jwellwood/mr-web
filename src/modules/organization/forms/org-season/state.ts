import type { OrgSeasonFormData } from './validation';

export const initialOrgSeasonState: OrgSeasonFormData = {
  yearStarted: new Date(),
  yearEnded: new Date(),
  isCurrent: false,
  comment: '',
};
