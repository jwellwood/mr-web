import { SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { ILeagueTableTeam } from '../../types';
import { league_table } from './config/columns';

interface Props {
  name: string;
  data: ILeagueTableTeam[];
  loading?: boolean;
}

export default function LeagueTable({ name, data, loading }: Props) {
  const rows = data?.map((item, i) => {
    return {
      standing: i + 1,
      name: { value: item.team.teamName, link: `team/${item.team._id}` },
      played: item.played,
      wins: item.wins,
      draws: item.draws,
      losses: item.losses,
      goalsFor: item.goalsFor,
      goalsAgainst: item.goalsAgainst,
      goalDiff: item.goalDiff,
      points: item.points,
    };
  });
  return (
    <SectionContainer title={name}>
      <CustomTable
        rows={rows}
        columns={league_table}
        isSortable={false}
        loading={loading}
        loadingRowCount={20}
      />
    </SectionContainer>
  );
}
