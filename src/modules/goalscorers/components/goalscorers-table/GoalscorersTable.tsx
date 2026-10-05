import { Pagination, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomTable, DataError, NoDataText, SectionContainer } from '../../../../components';
import { IMAGE_TYPE } from '../../../../constants';
import { useCustomParams } from '../../../../hooks';
import { theme } from '../../../../theme';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_GOALSCORER_LEADERBOARD } from '../../graphql';
import { columns } from './columns';

interface Props {
  data?: T_FETCH_GOALSCORER_LEADERBOARD['data'];
  loading?: boolean;
  error?: TApolloError;
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function GoalScorersTable({
  data,
  loading,
  error,
  page,
  pageSize,
  totalPages,
  onPageChange,
}: Props) {
  const { t } = useTranslation('goalscorers');
  const { orgId } = useCustomParams();

  const rows =
    data?.entries.map((item, i) => {
      return {
        standing: (page - 1) * pageSize + i + 1,
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
    <>
      {totalPages > 1 && (
        <SectionContainer>
          <Stack alignItems="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => onPageChange(value)}
              color="primary"
              variant="outlined"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: theme.palette.label.main,
                  borderColor: theme.palette.label.main,
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                },
              }}
            />
          </Stack>
        </SectionContainer>
      )}
      <SectionContainer>
        {data?.entries.length === 0 && !loading ? (
          <NoDataText>{t('NO_DATA.GOALSCORERS')}</NoDataText>
        ) : (
          <CustomTable
            rows={rows}
            columns={columns(t)}
            isSortable={false}
            loading={loading}
            loadingRowCount={pageSize}
          />
        )}
        {error ? <DataError error={error} /> : null}
      </SectionContainer>
    </>
  );
}
