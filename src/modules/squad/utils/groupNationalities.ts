import { FETCH_SQUAD_STATS_QUERY } from '../types';

export const groupNationalities = (players?: FETCH_SQUAD_STATS_QUERY['stats']) => {
  const playersMap = players?.reduce((acc: Record<string, typeof players>, cur) => {
    const nat = (cur.nationality ?? '') as string;

    acc[nat] = acc[nat] || [];
    acc[nat].push(cur);

    return acc;
  }, {});
  return Object.entries(playersMap || {})
    .map(([key, players]) => {
      return {
        key,
        players,
      };
    })
    .sort((a, b) => {
      if (a.players.length > b.players.length) {
        return -1;
      } else if (a.players.length < b.players.length) {
        return 1;
      }
      if (a.key < b.key) {
        return -1;
      } else if (a.key > b.key) {
        return 1;
      }
      return 0;
    });
};
