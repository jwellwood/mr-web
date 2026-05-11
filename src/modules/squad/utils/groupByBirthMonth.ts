import { T_FETCH_PLAYER_PROFILES_QUERY } from '../graphql';

type TPlayers = T_FETCH_PLAYER_PROFILES_QUERY['players'];

export const groupByBirthMonth = (players?: TPlayers) => {
  const playersMap = players?.reduce((acc: Record<string, TPlayers>, cur) => {
    let monthKey = '00';

    if (cur.dateOfBirth) {
      const date = new Date(cur.dateOfBirth);
      if (!isNaN(date.getTime())) {
        monthKey = String(date.getMonth() + 1).padStart(2, '0');
      }
    }

    acc[monthKey] = acc[monthKey] || [];
    acc[monthKey].push(cur);

    return acc;
  }, {});

  return Object.entries(playersMap || {})
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, players]) => ({ key, players }));
};
