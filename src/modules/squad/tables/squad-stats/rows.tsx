import { FETCH_SQUAD_STATS_QUERY } from '../../types';

const formatStat = (stat?: number) => (stat ? +stat.toFixed(2) : 0);

export const rows = (data?: FETCH_SQUAD_STATS_QUERY, averages?: boolean) => {
  return data?.stats?.map(stats => {
    const id = stats?._id ?? '';
    const base = {
      name: { value: stats?.name, link: `player/${id}` },
      apps: stats?.apps,
      goals: stats?.goals,
      assists: stats?.assists,
      mvp: stats?.mvp,
      conceded: stats?.conceded,
      cleanSheets: stats?.cleanSheets,
    } as const;

    if (!averages) return base;

    return {
      name: base.name,
      apps: base.apps,
      goals: base.goals,
      goalsPerGame: formatStat(stats?.goalsPerGame),
      assists: base.assists,
      assistsPerGame: formatStat(stats?.assistsPerGame),
      mvp: base.mvp,
      mvpPerGame: formatStat(stats?.mvpPerGame),
      conceded: base.conceded,
      concededPerGame: formatStat(stats?.concededPerGame),
      cleanSheets: base.cleanSheets,
    } as const;
  });
};
