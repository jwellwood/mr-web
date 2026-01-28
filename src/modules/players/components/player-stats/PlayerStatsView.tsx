import { ApolloError } from '@apollo/client';
import {
  DataError,
  NoDataText,
  SectionContainer,
  MatchStatsTable,
  MatchAverages,
} from '../../../../components';
import { mapPlayerMatchStats } from '../../helpers/mapPlayerMatchStats';
import { mapPlayerAverages } from '../../helpers';
import StatsFilters from '../../forms/stats-filter/StatsFilters';
import CustomTable from '../../../../components/tables/CustomTable';
import * as OVERALL_STATS_CONFIG from './config/overall-stats';
import * as GAMES_WITH_STAT_CONFIG from './config/games-with-stat';
import { T_FETCH_PLAYER_STATS } from '../../types';

interface Props {
  data?: T_FETCH_PLAYER_STATS;
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerStatsView({ data, loading, error }: Props) {
  const hasStats = data && data.player.apps && data?.player.apps > 0;
  const renderContent = () => {
    return data && data?.player.apps === 0 ? (
      <NoDataText>No stats </NoDataText>
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
          <SectionContainer title="Stats">
            <CustomTable
              columns={OVERALL_STATS_CONFIG.columns}
              rows={OVERALL_STATS_CONFIG.rows(data?.player, loading)}
              isSortable={false}
              cellIndexStyles={OVERALL_STATS_CONFIG.styles}
            />
          </SectionContainer>
          <SectionContainer title="Games with stats">
            <CustomTable
              columns={GAMES_WITH_STAT_CONFIG.columns}
              rows={GAMES_WITH_STAT_CONFIG.rows(data?.player, loading)}
              isSortable={false}
              cellIndexStyles={GAMES_WITH_STAT_CONFIG.styles}
            />
          </SectionContainer>
        </>
      )}
    </>
  );
}
