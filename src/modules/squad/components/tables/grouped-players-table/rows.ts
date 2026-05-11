import { parseDate } from '../../../../../utils';
import { T_FETCH_PLAYER_PROFILES_QUERY } from '../../../graphql';

export const rows = (data?: T_FETCH_PLAYER_PROFILES_QUERY) => {
  return data?.players.map(player => ({
    nationality: player.nationality,
    position: player.position,
    name: {
      value: player.name,
      link: `player/${player._id}`,
    },
    dob: parseDate(player.dateOfBirth || ''),
  }));
};
