import { CustomTable, SectionContainer } from '../../../../../components';
import { useCustomParams } from '../../../../../hooks';
import { T_FETCH_LEAGUE_TABLES } from '../../graphql';
import { league_table } from './config/columns';

interface Props {
  name: string;
  data: T_FETCH_LEAGUE_TABLES['data'][0]['data'];
  loading?: boolean;
}

export default function LeagueTable({ name, data, loading }: Props) {
  const { orgId } = useCustomParams();
  const rows = data?.map((item, i) => {
    return {
      standing: i + 1,
      name: { value: item.team.teamName, link: `/org/${orgId}/team/${item.team._id}` },
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
