import { useTranslation } from 'react-i18next';
import { CustomTable, NoDataText, SectionContainer } from '../../../../components';
import { useCustomParams } from '../../../../hooks';
import { theme } from '../../../../theme';
import { CompetitionConfig } from '../../../seasons/helpers/mapOrgSeasonForm';
import { T_FETCH_LEAGUE_TABLES } from '../../graphql';
import { columns } from './columns';

interface Props {
  data?: T_FETCH_LEAGUE_TABLES;
  competitionConfig: CompetitionConfig;
  loading?: boolean;
}

export default function LeagueTable({ data, competitionConfig, loading }: Props) {
  const { t } = useTranslation('tables');
  const { orgId } = useCustomParams();
  const { promotionPositions, relegationPositions, splitIndexes, teams } = competitionConfig;

  const rows = data?.data?.map((item, i) => {
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

  return !data?.data.length && !loading ? (
    <NoDataText>{t('NO_DATA.TABLE')}</NoDataText>
  ) : (
    <SectionContainer>
      <CustomTable
        rows={rows || []}
        columns={columns(t)}
        isSortable={false}
        rowStyles={{
          [getHighestPromotionPosition()]: promotionPositions
            ? { borderBottom: `1px dashed ${theme.palette.success.dark}` }
            : undefined,
          [getLowestRelegationPosition()]: relegationPositions
            ? { borderBottom: `1px dashed ${theme.palette.error.dark}` }
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
        loadingRowCount={teams?.length || 10}
      />
    </SectionContainer>
  );
}
