import { StatSkeleton } from '../../../loaders';
import { IMatchesStatsTable } from '../../types';

export const rows = (stats?: IMatchesStatsTable, loading?: boolean) => {
  const getValue = (value?: number) => (loading ? <StatSkeleton /> : value || 0);
  return [
    {
      played: getValue(stats?.played),
      wins: getValue(stats?.wins),
      draws: getValue(stats?.draws),
      defeats: getValue(stats?.defeats),
      goalsFor: getValue(stats?.goalsFor),
      goalsAgainst: getValue(stats?.goalsAgainst),
      difference: getValue(stats?.difference),
    },
  ] as const;
};
