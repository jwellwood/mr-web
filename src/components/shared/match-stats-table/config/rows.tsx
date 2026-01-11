import { IMatchStats } from '../../../../modules/matches/types';
import StatSkeleton from '../../../loaders/StatSkeleton';

export const rows = (stats?: IMatchStats, loading?: boolean) => {
  return [
    {
      played: loading ? <StatSkeleton /> : stats?.total,
      wins: loading ? <StatSkeleton /> : stats?.wins,
      draws: loading ? <StatSkeleton /> : stats?.draws,
      defeats: loading ? <StatSkeleton /> : stats?.defeats,
      goalsFor: loading ? <StatSkeleton /> : stats?.scored,
      goalsAgainst: loading ? <StatSkeleton /> : stats?.conceded,
      difference: loading ? <StatSkeleton /> : stats?.difference,
    },
  ] as const;
};
