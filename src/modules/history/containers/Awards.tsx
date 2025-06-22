import React from 'react';
import { useQuery } from '@apollo/client';
import { CenteredGrid } from '../../../components/grids';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import AwardCard from '../components/AwardCard';
import { GET_SEASON_AWARDS } from '../graphql/season';

const Awards: React.FC = () => {
  const { seasonId } = useCustomParams();

  const { data, loading, error } = useQuery(GET_SEASON_AWARDS, {
    variables: { seasonId },
  });

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <>
      <CenteredGrid dir="row">
        {!loading &&
          data?.awards.map(item => {
            return <AwardCard key={item.awardName} award={item} />;
          })}
      </CenteredGrid>
    </>
  );
};

export default Awards;
