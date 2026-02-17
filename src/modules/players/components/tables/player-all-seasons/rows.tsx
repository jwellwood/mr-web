import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../types';

export const rows = (baseUrl: string, data?: T_FETCH_PLAYER_SEASONS_SUMMARY['seasons']) => {
  return data?.map(season => ({
    season: {
      value: season?.seasonName,
      link: season && baseUrl ? `${baseUrl}/season/${season.seasonId}` : undefined,
    },
    apps: season?.apps,
    goals: season?.goals,
    assists: season?.assists,
    combined: (season?.goals || 0) + (season?.assists || 0),
  }));
};
