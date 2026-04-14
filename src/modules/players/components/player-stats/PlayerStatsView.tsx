import { useTranslation } from 'react-i18next';
import {
  DataError,
  NoDataText,
  SectionContainer,
  MatchStatsTable,
  MatchAverages,
} from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import StatsFilters from '../../forms/stats-filter/StatsFilters';
import { T_FETCH_PLAYER_STATS } from '../../graphql';
import { mapPlayerAverages } from '../../helpers';
import { mapPlayerMatchStats } from '../../helpers/mapPlayerMatchStats';
import * as GAMES_WITH_STAT_CONFIG from '../tables/games-with-stat';
import * as OVERALL_STATS_CONFIG from '../tables/player-stats';

interface Props {
  data?: T_FETCH_PLAYER_STATS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerStatsView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const hasStats = data && data.player.apps && data?.player.apps > 0;
  const renderContent = () => {
    return data && data?.player.apps === 0 ? (
      <NoDataText>{t('NO_DATA.STATS')}</NoDataText>
    ) : error ? (
      <DataError error={error} />
    ) : (
      <>
        <MatchStatsTable stats={mapPlayerMatchStats(data?.player)} loading={loading} />
        <MatchAverages stats={mapPlayerAverages(data?.player)} loading={loading} />
      </>
    );
  };
  return (
    <>
      <SectionContainer title={<StatsFilters />}>{renderContent()}</SectionContainer>
      {!error && hasStats && (
        <>
          <SectionContainer title={t('SECTIONS.STATS')}>
            <CustomTable
              columns={OVERALL_STATS_CONFIG.columns}
              rows={OVERALL_STATS_CONFIG.rows(t, data?.player)}
              isSortable={false}
              loading={loading}
              loadingRowCount={11}
            />
          </SectionContainer>
          <SectionContainer title={t('SECTIONS.GAMES_WITH_STATS')}>
            <CustomTable
              columns={GAMES_WITH_STAT_CONFIG.columns}
              rows={GAMES_WITH_STAT_CONFIG.rows(t, data?.player)}
              isSortable={false}
              loading={loading}
              loadingRowCount={4}
            />
          </SectionContainer>
        </>
      )}
    </>
  );
}
