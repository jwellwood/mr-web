import { Pagination, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer, NoDataText } from '../../../../components';
import { CustomTable, CellValue } from '../../../../components/tables';
import { theme } from '../../../../theme';
import { TApolloError } from '../../../../types/apollo';
import { TFilters } from '../../context/SquadStatsFiltersContext';
import StatFilters from '../../forms/StatsFilters';
import { T_FETCH_SQUAD_STATS_QUERY } from '../../graphql';
import { columns, columns_averages, rows } from '../tables/squad-stats';
import PlayerProfilesModal from './PlayerProfilesModal';

interface Props {
  error?: TApolloError;
  loading: boolean;
  data?: T_FETCH_SQUAD_STATS_QUERY;
  filters: TFilters;
  page: number;
  sortBy: string;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string) => void;
}

export default function StatsView({
  error,
  loading,
  data,
  filters,
  page,
  sortBy,
  onPageChange,
  onSortChange,
}: Props) {
  const { t } = useTranslation('squad');
  const totalPages = data?.stats.totalPages ?? 1;

  const renderContent = () => {
    return data && data?.stats.players.length === 0 ? (
      <NoDataText>{t('NO_DATA.SQUAD_PLAYERS')}</NoDataText>
    ) : (
      <>
        <CustomTable
          rows={rows(data, filters.showAverages) as Record<string, CellValue | ReactNode>[]}
          columns={filters.showAverages ? columns_averages(t) : columns(t)}
          isSortable
          sortByString={sortBy}
          onSortChange={onSortChange}
          loading={loading}
          loadingRowCount={20}
        />
      </>
    );
  };

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
      <SectionContainer title={<StatFilters />} secondaryAction={<PlayerProfilesModal />}>
        {error ? <DataError error={error} /> : renderContent()}
      </SectionContainer>
    </>
  );
}
