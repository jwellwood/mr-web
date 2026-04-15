import { useTranslation } from 'react-i18next';
import { CustomTable, DataError, NoDataText, SectionContainer } from '../../../../components';
import { IMAGE_TYPE } from '../../../../constants';
import { useCustomParams } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_GOALSCORER_LEADERBOARD } from '../../graphql';
import { columns } from './columns';

interface Props {
  data?: T_FETCH_GOALSCORER_LEADERBOARD['data'];
  loading?: boolean;
  error?: TApolloError;
}

export default function GoalScorersTable({ data, loading, error }: Props) {
  const { t } = useTranslation('results');
  const { orgId } = useCustomParams();

  const rows =
    data?.map((item, i) => {
      return {
        standing: i + 1,
        name: {
          value: item.player.name,
          link: `/org/${orgId}/team/${item.team._id}/player/${item.player._id}`,
        },
        teamBadge: { value: item.team.badgeUrl, type: IMAGE_TYPE.BADGE },
        team: {
          value: item.team.teamName,
          link: `/org/${orgId}/team/${item.team._id}`,
        },
        goals: item.goals,
      };
    }) || [];

  return (
    <SectionContainer>
      {data?.length === 0 && !loading ? (
        <NoDataText>{t('NO_DATA.GOALSCORERS')}</NoDataText>
      ) : (
        <CustomTable
          rows={rows}
          columns={columns(t)}
          isSortable={false}
          loading={loading}
          loadingRowCount={20}
        />
      )}
      {error ? <DataError error={error} /> : null}
    </SectionContainer>
  );
}
