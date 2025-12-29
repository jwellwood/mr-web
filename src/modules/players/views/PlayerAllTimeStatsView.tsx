import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer } from '../../../components';
import { IMatchStats } from '../../matches/types';
import MatchStatsTable from '../../matches/components/MatchStatsTable';
import Averages from '../../matches/components/Averages';
import { mapPlayerMatchStats } from '../helpers/mapPlayerMatchStats';
import { mapPlayerAverages } from '../helpers';
import { IPlayerStats } from '../types';
import PlayerGameStreaks from '../containers/PlayerGameStreaks';
import GamesWithStatTable from '../components/games-with-stat-table/GamesWithStatTable';
import PlayerStatsTable from '../components/player-stats-table/PlayerStatsTable';

type Props = {
  data?: { player: IPlayerStats };
  loading: boolean;
  error?: ApolloError;
};

export default function PlayerAllTimeStatsView({ data, loading, error }: Props) {
  return error ? (
    <DataError error={error} />
  ) : (
    <>
      <SectionContainer>
        <MatchStatsTable
          stats={mapPlayerMatchStats(data?.player, loading) as unknown as IMatchStats}
        />
        <Averages stats={mapPlayerAverages(data?.player)} loading={loading} />
      </SectionContainer>

      <SectionContainer title="Stats">
        <PlayerStatsTable stats={data?.player} loading={loading} />
      </SectionContainer>
      <SectionContainer title="Games with stats">
        <GamesWithStatTable data={data?.player} loading={loading} />
      </SectionContainer>
      <PlayerGameStreaks />
    </>
  );
}
