import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import { CustomTable } from '../../../../components/tables';
import { TApolloError } from '../../../../types/apollo';
import { usePlayerOpponentFilters } from '../../context';
import OpponentsFilters from '../../forms/opponents-filter/OpponentsFilters';
import { T_FETCH_PLAYER_OPPONENT_STATS } from '../../graphql';
import { columns, columns_averages, rows } from '../tables/player-opponents';

interface Props {
  data?: T_FETCH_PLAYER_OPPONENT_STATS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerOpponentStatsView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const { filters } = usePlayerOpponentFilters();

  return (
    <SectionContainer title={<OpponentsFilters />}>
      {error ? (
        <DataError error={error} />
      ) : !loading && !data?.stats[0]?.matches ? (
        <NoDataText>{t('NO_DATA.MATCHES')}</NoDataText>
      ) : (
        <CustomTable
          rows={rows(data?.stats, loading, filters.showAverages)}
          columns={filters.showAverages ? columns_averages(t) : columns(t)}
          isSortable
          sortByString="matches"
          loading={loading}
          loadingRowCount={20}
        />
      )}
    </SectionContainer>
  );
}
