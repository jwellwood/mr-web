import { SectionContainer } from '../../../components/containers';
import CustomTable from '../../../components/tables/CustomTable';
import { league_table, league_table_styles } from '../config/columns';
import { ILeagueTableTeam } from '../types';

type Props = {
  name: string;
  data: ILeagueTableTeam[];
};

export default function LeagueTable({ name, data }: Props) {
  const rows = data?.map((item, i) => {
    return {
      standing: i + 1,
      name: item.team.teamName,
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
        cellIndexStyles={league_table_styles}
        isSortable={false}
      />
    </SectionContainer>
  );
}
