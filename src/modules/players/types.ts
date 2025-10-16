export type Streak = {
  length: number;
  startDate: string;
  endDate: string;
};

export type StreakTypes = {
  currentPlayedStreak: Streak;
  currentGoalStreak: Streak;
  currentAssistStreak: Streak;
  currentContributionStreak: Streak;
  playedStreak: Streak;
  goalStreak: Streak;
  assistStreak: Streak;
  contributionStreak: Streak;
};

export type AllPlayerStreaks = {
  playerId: string;
  longestPlayedStreak: number;
};
