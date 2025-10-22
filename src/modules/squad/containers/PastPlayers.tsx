import { useQuery } from '@apollo/client';

import { FETCH_PAST_PLAYERS } from '../graphql';
import { Spinner } from '../../../components/loaders';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { useSeasons } from '../../../hooks/useSeasons';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import PastPlayersTable from '../components/PastPlayersTable';

export default function PastPlayers() {
  const { teamId } = useCustomParams();
  const { seasonId } = useSeasons();

  const { loading, data, error } = useQuery(FETCH_PAST_PLAYERS, {
    variables: { teamId, seasonId },
  });

  const renderContent = () => {
    return !loading ? (
      <>
        {data?.players.length === 0 ? (
          <CustomTypography color="warning">No past players yet</CustomTypography>
        ) : (
          <>
            <PlayersByNumbers players={data?.players || []} showAge={false} loading={loading} />
            <PastPlayersTable players={data?.players || []} />
          </>
        )}
      </>
    ) : (
      <Spinner />
    );
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
