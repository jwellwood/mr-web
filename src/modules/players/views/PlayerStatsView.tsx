import { ApolloError } from '@apollo/client';
import {
  DataError,
  NoDataText,
  SectionContainer,
  MatchStatsTable,
  MatchAverages,
} from '../../../components';
import { IMatchStats } from '../../matches/types';
import { mapPlayerMatchStats } from '../helpers/mapPlayerMatchStats';
import { mapPlayerAverages } from '../helpers';
import { IPlayerStats } from '../types';
import GamesWithStatTable from '../components/games-with-stat-table/GamesWithStatTable';
import PlayerStatsTable from '../components/player-stats-table/PlayerStatsTable';
import StatsFilters from '../forms/stats-filter/StatsFilters';

interface Props {
  data?: { player: IPlayerStats };
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerStatsView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data && data?.player.apps === 0 ? (
      <NoDataText>No stats </NoDataText>
    ) : error ? (
      <DataError error={error} />
    ) : (
      <>
        <MatchStatsTable
          stats={mapPlayerMatchStats(data?.player, loading) as unknown as IMatchStats}
          loading={loading}
        />
        <MatchAverages stats={mapPlayerAverages(data?.player)} loading={loading} />
      </>
    );
  };
  return (
    <>
      <SectionContainer title={<StatsFilters />}>{renderContent()}</SectionContainer>
      {!error && data?.player && data?.player?.apps > 0 && (
        <>
          <SectionContainer title="Stats">
            <PlayerStatsTable stats={data?.player} loading={loading} />
          </SectionContainer>
          <SectionContainer title="Games with stats">
            <GamesWithStatTable data={data?.player} loading={loading} />
          </SectionContainer>
        </>
      )}
    </>
  );
}
