import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from '../../../components/loaders';
import { CustomTypography } from '../../../components/typography';
import { useCustomParams } from '../../../hooks/useCustomParams';
import PastPlayersTable from '../components/PastPlayersTable';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { GET_PAST_PLAYERS } from '../graphql';
import { useSeasons } from '../../../hooks/useSeasons';

const PastPlayers: React.FC = () => {
  const { teamId } = useCustomParams();
  const { seasonId } = useSeasons();

  const { loading, data } = useQuery(GET_PAST_PLAYERS, {
    variables: { teamId, seasonId },
  });

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

export default PastPlayers;
