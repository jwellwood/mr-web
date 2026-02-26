import type { ISelectOptions } from '../../components';
import type { IListItem } from '../../components/lists';
import { LINK_TYPE } from '../../constants';
import { ORG_PATHS } from './router/paths';

export const PAGES = {
  ORG: 'Organization',
  ADD: 'Add New Organization',
  EDIT: 'Edit Organization',
  EDIT_BADGE: 'Edit Organization Badge',
  // Comp
  MORE: 'More',
  COMP: 'Competition',
  ADD_COMPETITION: 'Add Competition',
  EDIT_COMP: 'Edit Competition',
  // Season
  ORG_SEASON: 'Season',
  ADD_ORG_SEASON: 'Add Season',
  EDIT_ORG_SEASON: 'Edit Season',
  ORG_SEASON_ADMIN: 'Season Admin',
  // Result
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

export const ORG_ADMIN_LINKS: IListItem[] = [
  { label: 'Add Team', type: LINK_TYPE.ADD, link: ORG_PATHS.ADD_TEAM },
  {
    label: 'Add Competition',
    type: LINK_TYPE.ADD,
    link: ORG_PATHS.ADD_COMPETITION,
  },
  {
    label: 'Add Season',
    type: LINK_TYPE.ADD,
    link: ORG_PATHS.ADD_ORG_SEASON,
  },
  { label: 'Edit Organization', type: LINK_TYPE.EDIT, link: ORG_PATHS.EDIT },
  { label: 'Edit Org Badge', type: LINK_TYPE.EDIT, link: ORG_PATHS.EDIT_BADGE },
];

export const ORG_SEASON_ADMIN_LINKS = () => [
  { label: 'Season Admin', type: LINK_TYPE.EDIT, link: 'admin' },
];

export const ADMIN_LINKS = (orgId?: string, orgSeasonId?: string) => [
  {
    label: 'Add Result',
    type: LINK_TYPE.ADD,
    link: `/org/${orgId}/org_season/${orgSeasonId}/${ORG_PATHS.ADD_RESULT}`,
  },
  // {
  //   label: 'Add Round of Fixtures',
  //   type: LINK_TYPE.ADD,
  //   link: `/org/${orgId}/org_season/${orgSeasonId}/${ORG_PATHS.ADD_GAME_WEEK}`,
  // },
  {
    label: 'Edit Season',
    type: LINK_TYPE.EDIT,
    link: `/org/${orgId}/org_season/${orgSeasonId}/${ORG_PATHS.EDIT_ORG_SEASON}`,
  },
];

export const COMP_ADMIN_LINKS = [
  { label: 'Add New Winner', type: LINK_TYPE.ADD, link: ORG_PATHS.ADD_TEAM },
  {
    label: 'Edit Competition',
    type: LINK_TYPE.EDIT,
    link: ORG_PATHS.EDIT_COMPETITION,
  },
];
