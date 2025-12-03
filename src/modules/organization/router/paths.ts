export const ORG_PATHS = {
  ORG: '/org/:orgId',
  ADD: '/add_org',
  ADD_TEAM: 'add_team',
  EDIT: 'edit',
  EDIT_BADGE: 'edit_badge',
  // Linked entities
  ADD_ORG_SEASON: 'add_org_season',
  EDIT_ORG_SEASON: 'edit',
  ORG_SEASON: 'org_season/:orgSeasonId',
  ADD_RESULT: 'add_result',
  EDIT_RESULT: 'edit',
  RESULT: 'result/:resultId',
  ADD_COMPETITION: 'add_competition',
  EDIT_COMPETITION: 'edit_comp',
  COMPETITION: 'competition/:competitionId',
} as const;
