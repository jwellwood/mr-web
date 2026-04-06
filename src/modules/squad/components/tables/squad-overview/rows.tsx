import { IMAGE_TYPE } from '../../../../../constants';
import { T_FETCH_SQUAD_LIST_BY_SEASON_QUERY } from '../../../graphql';

export const rows = (data?: T_FETCH_SQUAD_LIST_BY_SEASON_QUERY['players'], loading?: boolean) => {
  const arr = new Array(15).fill({});
  const mappedPlayers = loading ? arr : data;

  return mappedPlayers?.map(player => {
    return {
      number: player.number,
      position: player.position,
      nationality: player.nationality,
      image: { value: player.image?.url, type: IMAGE_TYPE.USER },
      name: { value: player.name, link: `player/${player._id}` },
      apps: +player.apps,
      goals: +player.goals,
      assists: +player.assists,
    };
  });
};
