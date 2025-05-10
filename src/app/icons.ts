export const STAT_ICONS = {
    APP: 'app',
    STARTER: 'starter',
    MINS: 'mins',
    GOAL: 'goal',
    ASSIST: 'assist',
    CONCEDED: 'conceded',
    OWN_GOAL: 'ownGoal',
    YELLOW_CARD: 'yellowCard',
    RED_CARD: 'redCard',
    PEN_SCORED: 'penScored',
    PEN_MISSED: 'penMissed',
    PEN_SAVED: 'penSaved',
    CLEAN_SHEET: 'cleanSheet',
    MVP: 'mvp',
    SUB_IN: 'subIn',
    SUB_OUT: 'subOut',
} as const;

export type StatIconType = typeof STAT_ICONS[keyof typeof STAT_ICONS];

export const NAV_ICONS = {
    MENU: 'menu',
    OVERVIEW: 'team',
    SQUAD: 'squad',
    MATCHES: 'results',
    HISTORY: 'history',
} as const;

export type NavIconType = typeof NAV_ICONS[keyof typeof NAV_ICONS];

export const HISTORY_ICONS = {
    WINNER: 'trophy',
    RUNNER_UP: 'medal',
} as const;

export type HistoryIconType = typeof HISTORY_ICONS[keyof typeof HISTORY_ICONS];