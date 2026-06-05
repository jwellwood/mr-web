export const TTiebreaker = {
  HEAD_TO_HEAD: 'HEAD_TO_HEAD',
  GOAL_DIFFERENCE: 'GOAL_DIFFERENCE',
  PENALTIES: 'PENALTIES',
} as const;

export const isCupCompetitionType = (competitionType?: string | null) =>
  competitionType?.toLowerCase() === 'cup';
