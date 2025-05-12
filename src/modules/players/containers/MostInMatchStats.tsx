import React from 'react';
import { useQuery } from '@apollo/client';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MostInGame from '../components/MostInGame';
import { GET_MOST_ASSISTS_IN_MATCH, GET_MOST_GOALS_IN_MATCH } from '../graphql';

const MostInMatchStats: React.FC = () => {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_MOST_GOALS_IN_MATCH, {
    variables: { teamId },
  });
  const {
    data: assistsData,
    loading: assistLoading,
    error: assistError,
  } = useQuery(GET_MOST_ASSISTS_IN_MATCH, {
    variables: { teamId },
  });

  const { stats } = data || {};
  const { assistStats } = assistsData || {};

  if (error || assistError) {
    return <ErrorGraphql error={(error || assistError) as Error} />;
  }

  return (
    <>
      <MostInGame title="Most Goals in Match" data={stats || []} loading={loading} />
      <MostInGame title="Most Assists in Match" data={assistStats || []} loading={assistLoading} />
    </>
  );
};

export default MostInMatchStats;
