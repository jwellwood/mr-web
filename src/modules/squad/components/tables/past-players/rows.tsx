import { IMAGE_TYPE } from '../../../../../constants';
import { FETCH_PAST_PLAYERS_QUERY } from '../../../types';

export const rows = (data?: FETCH_PAST_PLAYERS_QUERY) => {
  const defaultData = { players: [] };
  return (data ?? defaultData).players.map(player => ({
    position: player.position,
    nationality: player.nationality,
    image: {
      value: player.image,
      type: IMAGE_TYPE.USER,
    },
    name: {
      value: player.name,
      link: `player/${player._id}`,
    },
    joined: player.joined,
    left: player.left,
    seasons: player.seasons,
  }));
};
