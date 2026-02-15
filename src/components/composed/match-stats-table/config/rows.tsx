import { IMatchesStatsTable } from '../../types';

export const rows = (stats?: IMatchesStatsTable) => {
  return [
    {
      played: stats?.played || 0,
      wins: stats?.wins || 0,
      draws: stats?.draws || 0,
      defeats: stats?.defeats || 0,
      goalsFor: stats?.goalsFor || 0,
      goalsAgainst: stats?.goalsAgainst || 0,
      difference: stats?.difference || 0,
    },
  ] as const;
};
