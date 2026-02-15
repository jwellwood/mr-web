import { T_FETCH_TOP_PLAYER_STREAKS_QUERY } from '../../types';

export const rows = (streakType: string, data?: T_FETCH_TOP_PLAYER_STREAKS_QUERY['streaks']) => {
  const streakData = data || [];
  return streakData.map((item, i) => ({
    rank: i + 1,
    players: item.playerName,
    value: item[streakType as keyof typeof item],
  }));
};
