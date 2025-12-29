import { ApolloError } from '@apollo/client';
import { DataError, NoDataText, SectionContainer } from '../../../components';
import SelectSeason from '../containers/SelectSeason';
import { IMatchStats } from '../../matches/types';
import MatchStatsTable from '../../matches/components/MatchStatsTable';
import Averages from '../../matches/components/Averages';
import { mapPlayerMatchStats } from '../helpers/mapPlayerMatchStats';
import { mapPlayerAverages } from '../helpers';
import { IPlayerStats } from '../types';
import GamesWithStatTable from '../components/games-with-stat-table/GamesWithStatTable';
import PlayerStatsTable from '../components/player-stats-table/PlayerStatsTable';

type Props = {
  data?: { player: IPlayerStats };
  playerId: string;
  loading: boolean;
  error?: ApolloError;
};

export default function PlayerSeasonStatsView({ data, playerId, loading, error }: Props) {
  const renderContent = () => {
    return data?.player.apps === 0 ? (
      <NoDataText>No stats for this season</NoDataText>
    ) : error ? (
      <DataError error={error} />
    ) : (
      <>
        <MatchStatsTable
          stats={mapPlayerMatchStats(data?.player, loading) as unknown as IMatchStats}
        />
        <Averages stats={mapPlayerAverages(data?.player)} loading={loading} />
      </>
    );
  };
  return (
    <>
      <SectionContainer title={<SelectSeason playerId={playerId} />}>
        {renderContent()}
      </SectionContainer>
      {!error && (
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
