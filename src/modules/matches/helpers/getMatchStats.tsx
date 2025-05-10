import { IMatchStats } from '../../../types';
export const getMatchStats = (stats: IMatchStats) => {
  return [
    {
      played: stats?.total,
      wins: stats?.wins,
      draws: stats?.draws,
      defeats: stats?.defeats,
      goalsFor: stats?.scored,
      goalsAgainst: stats?.conceded,
      difference: stats?.difference,
    },
  ];
};
