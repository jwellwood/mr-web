import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../../../types';

export const rows = (data?: T_FETCH_PLAYER_SEASONS_SUMMARY['seasons'], loading?: boolean) => {
  const arr = new Array(15).fill({});

  const mappedSeasons = loading || !data ? arr : data;

  return mappedSeasons?.map(season => ({
    season: {
      value: season?.seasonName,
      link: season ? `season/${season.seasonId}` : undefined,
    },
    apps: season?.apps,
    goals: season?.goals,
    assists: season?.assists,
    combined: (season?.goals || 0) + (season?.assists || 0),
  }));
};
