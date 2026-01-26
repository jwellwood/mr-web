import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import RecordPlayers from '../../RecordPlayers';
import { FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../../../types';

export const rows = (data?: FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY, loading?: boolean) => {
  const { goals, assists, combined } = data?.stats.combined
    ? data.stats
    : {
        goals: { value: 0, players: [], seasons: [] },
        assists: { value: 0, players: [], seasons: [] },
        combined: { value: 0, players: [], seasons: [] },
      };

  const tableData = [
    {
      label: 'Most Goals',
      players: goals ? goals.players : [],
      seasons: goals ? goals.seasons : [],
      value: goals,
    },
    {
      label: 'Most Assists',
      players: assists ? assists.players : [],
      seasons: assists ? assists.seasons : [],
      value: assists,
    },
    {
      label: 'Combined',
      players: combined ? combined.players : [],
      seasons: combined ? combined.seasons : [],
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
