import { Pagination, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { theme } from '../../../../theme';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PAST_PLAYERS_QUERY } from '../../graphql';
import { columns, rows } from '../tables/past-players';

interface Props {
  data?: T_FETCH_PAST_PLAYERS_QUERY;
  error?: TApolloError;
  loading: boolean;
  page: number;
  sortBy: string;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string) => void;
}

export default function PastPlayersView({
  error,
  data,
  loading,
  page,
  sortBy,
  onPageChange,
  onSortChange,
}: Props) {
  const { t } = useTranslation('squad');
  const totalPages = data?.players.totalPages ?? 1;

  const renderData =
    data?.players.players.length === 0 ? (
      <NoDataText>{t('NO_DATA.PAST_PLAYERS')}</NoDataText>
    ) : (
      <CustomTable
        columns={columns(t)}
        rows={rows(data)}
        isSortable
        sortByString={sortBy}
        onSortChange={onSortChange}
        loading={loading}
        loadingRowCount={20}
      />
    );

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
      <SectionContainer>{error ? <DataError error={error} /> : renderData}</SectionContainer>
    </>
  );
}
