import React from 'react';
import { useQuery } from '@apollo/client';
import ErrorGraphql from '../../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import MostInMatchesModal from '../../../squad/components/MostInMatchesModal';
import { GET_MOST_ASSISTS_BY_PLAYER_MATCHES } from '../../graphql/queries';

const PlayerMatchesWithMostAssists: React.FC = () => {
  const { teamId, playerId, orgId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_MOST_ASSISTS_BY_PLAYER_MATCHES, {
    variables: { teamId, playerId },
  });

  const { stats } = data || {};

  if (error) return <ErrorGraphql error={error} />;

  return (
    <MostInMatchesModal
      data={stats || []}
      loading={loading}
      orgId={orgId}
      teamId={teamId}
      title="Assists"
    />
  );
};

export default PlayerMatchesWithMostAssists;
