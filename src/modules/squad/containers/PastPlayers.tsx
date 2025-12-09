import { useQuery } from '@apollo/client';

import { FETCH_PAST_PLAYERS } from '../graphql';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks/useCustomParams';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { useSeasons } from '../../../hooks/useSeasons';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import PastPlayersTable from '../components/PastPlayersTable';
import { SectionContainer, NoDataText } from '../../../components';

export default function PastPlayers() {
  const { teamId } = useCustomParams();
  const { seasonId } = useSeasons();

  const { loading, data, error } = useQuery(FETCH_PAST_PLAYERS, {
    variables: { teamId, seasonId },
  });

  const renderData = () =>
    data?.players.length === 0 ? (
      <NoDataText>No past players yet</NoDataText>
    ) : (
      <SectionContainer>
        <PlayersByNumbers players={data?.players || []} showAge={false} loading={loading} />
        <PastPlayersTable players={data?.players || []} />
      </SectionContainer>
    );

  const renderContent = () => {
    return !loading ? renderData() : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
