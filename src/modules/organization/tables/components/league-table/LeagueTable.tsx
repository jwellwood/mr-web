import { CustomTable, SectionContainer } from '../../../../../components';
import { useCustomParams } from '../../../../../hooks';
import { theme } from '../../../../../theme';
import { T_FETCH_LEAGUE_TABLES } from '../../graphql';
import { league_table } from './columns';

interface Props {
  name: string;
  data: T_FETCH_LEAGUE_TABLES['data'][0];
  loading?: boolean;
}

export default function LeagueTable({ name, data, loading }: Props) {
  const { orgId } = useCustomParams();
  const { data: teamData, promotionPositions, relegationPositions, splitIndexes } = data;

  const rows = teamData?.map((item, i) => {
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

  const getLowestRelegationPosition = () => {
    if (!relegationPositions || relegationPositions.length === 0) return -1;
    return Math.min(...relegationPositions) - 2; // Convert to 0-based index
  };

  const getHighestPromotionPosition = () => {
    if (!promotionPositions || promotionPositions.length === 0) return -1;
    return Math.max(...promotionPositions) - 1; // Convert to 0-based index
  };

  return (
    <SectionContainer title={name}>
      <CustomTable
        rows={rows}
        columns={league_table}
        isSortable={false}
        rowStyles={{
          [getHighestPromotionPosition()]: promotionPositions
            ? { borderBottom: `2px dashed ${theme.palette.success.dark}` }
            : undefined,
          [getLowestRelegationPosition()]: relegationPositions
            ? { borderBottom: `2px dashed ${theme.palette.error.dark}` }
            : undefined,
          ...splitIndexes?.reduce(
            (acc, index) => ({
              ...acc,
              [index - 1]: { borderBottom: `2px dashed ${theme.palette.secondary.light}` },
            }),
            {}
          ),
        }}
        loading={loading}
        loadingRowCount={20}
      />
    </SectionContainer>
  );
}
