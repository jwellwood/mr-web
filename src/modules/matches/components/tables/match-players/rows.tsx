import { StatIcon } from '../../../../../components/icons';
import { T_FETCH_MATCH } from '../../../types';

export const rows = (currentPlayers?: T_FETCH_MATCH['match']['matchPlayers']) => {
  const players = currentPlayers?.filter(cp => cp !== undefined) || [];

  return players?.map(player => {
    return {
      isStarter: !player.isStarter && <StatIcon icon="subIn" />,
      position: player.matchPosition || player.playerId.position,
      name: { value: player.playerId.name, link: `player/${player.playerId._id}` },
      goals: player.goals || null,
      assists: player.assists || null,
      conceded: player.conceded || null,
      mvp: player.mvp ? <StatIcon icon="mvp" /> : null,
    };
  });
};
