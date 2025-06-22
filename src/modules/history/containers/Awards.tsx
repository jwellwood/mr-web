import React from 'react';
import { useQuery } from '@apollo/client';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { GET_SEASON_AWARDS } from '../graphql/season';
import AwardList from '../components/AwardList';

const Awards: React.FC = () => {
  const { seasonId } = useCustomParams();

  const { data, loading, error } = useQuery(GET_SEASON_AWARDS, {
    variables: { seasonId },
  });

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return !loading && <AwardList awards={data?.awards || []} />;
};

export default Awards;
