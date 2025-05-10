import React from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { GET_ALL_TIME_MATCH_STATS } from '../graphql/getAllTimeMatchStats.graphql';
import MatchStatsTable from "../components/MatchStatsTable.tsx";
import Averages from "../components/Averages.tsx";

const AllTimeMatchStats: React.FC = () => {
  const { teamId } = useCustomParams();

  const { data, loading, error } = useQuery(GET_ALL_TIME_MATCH_STATS, {
    variables: { teamId },
  });

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <SectionContainer>
      {data?.stats && !data?.stats?.total ? (
        <CustomTypography color="warning">No matches yet</CustomTypography>
      ) : (
        <>
          <MatchStatsTable stats={data?.stats} loading={loading} />
          <Averages stats={data?.stats} loading={loading} />
        </>
      )}
    </SectionContainer>
  );
};

export default AllTimeMatchStats;
