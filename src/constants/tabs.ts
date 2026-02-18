export const TAB_TYPES = {
  PROFILE: 'profile',
  ORG: 'org',
  ORG_TEAMS: 'orgTeams',
  PROFILE_TEAMS: 'profileTeams',
  TEAM: 'team',
  OVERVIEW: 'overview',
  MATCHES: 'matches',
  MATCH: 'match',
  SQUAD: 'squad',
  PLAYER: 'player',
  HISTORY: 'history',
  SEASON: 'season',
  RESULTS: 'results',
} as const;

export type TTabType = (typeof TAB_TYPES)[keyof typeof TAB_TYPES];
