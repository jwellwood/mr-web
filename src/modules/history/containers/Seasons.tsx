import React from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import { Spinner } from '../../../components/loaders';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SeasonsGraph from '../components/SeasonsGraph';
import { GET_POSITION_FINISHES } from '../graphql/getPositionFinishes.graphql';

const Seasons: React.FC = () => {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_POSITION_FINISHES, {
    variables: { teamId },
  });
  if (error) return <ErrorGraphql error={error} />;

  return (
    <>
      <SectionContainer>
        {!loading ? (
          data?.position.length === 0 ? (
            <CustomTypography color="warning">No seasons yet</CustomTypography>
          ) : (
            <SeasonsGraph data={data?.position} />
          )
        ) : (
          <Spinner />
        )}
      </SectionContainer>
    </>
  );
};

export default Seasons;
