import { POSITION_ORDER } from '../../../components/tables/helpers/sort';
import { T_FETCH_PLAYER_PROFILES_QUERY } from '../graphql';

type TPlayers = T_FETCH_PLAYER_PROFILES_QUERY['players'];

export const groupByPosition = (players?: TPlayers) => {
  const playersMap = players?.reduce((acc: Record<string, TPlayers>, cur) => {
    const pos = (cur.position ?? '') as string;

    acc[pos] = acc[pos] || [];
    acc[pos].push(cur);

    return acc;
  }, {});

  return Object.entries(playersMap || {})
    .sort((a, b) => {
      const orderA = POSITION_ORDER[a[0] as keyof typeof POSITION_ORDER] ?? -1;
      const orderB = POSITION_ORDER[b[0] as keyof typeof POSITION_ORDER] ?? -1;
      return orderB - orderA;
    })
    .map(([key, players]) => ({ key, players }));
};
