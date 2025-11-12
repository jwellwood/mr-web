import StatSkeleton from '../../../components/loaders/StatSkeleton';
import { IPlayerStats } from '../types';

export const mapPlayerMatchStats = (player: IPlayerStats, loading: boolean) => {
  const genValue = (value: number) => (!loading ? value : <StatSkeleton />);

  return {
    total: genValue(player.apps),
    wins: genValue(player.wins),
    draws: genValue(player.draws),
    defeats: genValue(player.defeats),
    scored: genValue(player.goalsFor),
    conceded: genValue(player.goalsAgainst),
    difference: genValue(player.goalDiff || player.goalsFor - player.goalsAgainst),
  };
};
