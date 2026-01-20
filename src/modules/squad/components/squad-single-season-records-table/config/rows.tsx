import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { ISquadSingleSeasonRecords } from '../../../types';
import RecordPlayers from '../../RecordPlayers';

export const rows = (data?: { stats: ISquadSingleSeasonRecords }, loading?: boolean) => {
  const { goals, assists, combined } = data?.stats.combined
    ? data.stats
    : {
        goals: { value: 0, players: [], seasons: [] },
        assists: { value: 0, players: [], seasons: [] },
        combined: { value: 0, players: [], seasons: [] },
      };

  const tableData = [
    { label: 'Most Goals', players: goals.players, seasons: goals.seasons, value: goals },
    { label: 'Most Assists', players: assists.players, seasons: assists.seasons, value: assists },
    {
      label: 'Combined',
      players: combined.players,
      seasons: combined.seasons,
      value: combined,
    },
  ];

  return tableData.map(({ label, players, value, seasons }) => {
    return {
      label,
      value: loading ? <StatSkeleton /> : value,
      names: loading ? (
        <CustomSkeleton width="100px" />
      ) : (
        <RecordPlayers names={players || []} loading={loading} />
      ),
      seasons: loading ? (
        <CustomSkeleton width="50px" />
      ) : (
        seasons.map(season => season.name).join(', ')
      ),
    };
  });
};
