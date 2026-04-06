import type { ISelectOptions } from '../../components';
import { LINK_TYPE } from '../../constants';
import { ORG_PATHS } from '../organization/router';

export const RESULT_STATUS = {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  CONFIRMED: 'CONFIRMED',
  DISPUTED: 'DISPUTED',
} as const;

export type ResultStatusType = (typeof RESULT_STATUS)[keyof typeof RESULT_STATUS];

export const PAGES = {
  RESULT: 'Result',
  ADD_RESULT: 'Add Result',
  ADD_GAME_WEEK: 'Add Gameweek',
  EDIT_RESULT: 'Edit Result',
} as const;

export const competitionOptions: ISelectOptions[] = [
  { label: 'Friendly', value: 'Friendly' },
  { label: 'League', value: 'League' },
  { label: 'Cup', value: 'Cup' },
  { label: 'Tournament', value: 'Tournament' },
  { label: 'Other', value: 'Other' },
];

export const ADMIN_LINKS = (orgId?: string, orgSeasonId?: string) => [
  {
    label: 'Add Result',
    type: LINK_TYPE.ADD,
    link: `/org/${orgId}/org_admin/org_season/${orgSeasonId}/${ORG_PATHS.ADD_RESULT}`,
  },
  {
    label: 'Add Gameweek',
    type: LINK_TYPE.ADD,
    link: `/org/${orgId}/org_admin/org_season/${orgSeasonId}/${ORG_PATHS.ADD_GAME_WEEK}`,
  },
];
