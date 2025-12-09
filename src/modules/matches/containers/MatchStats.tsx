import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import Averages from '../components/Averages';
import MatchStatsTable from '../components/MatchStatsTable';
import { FETCH_MATCHES_STATS } from '../graphql';

const MatchStats: React.FC = () => {
  const { teamId } = useCustomParams();
  const { seasonId } = useSeasons();

  const [matchStats, { loading, error, data }] = useLazyQuery(FETCH_MATCHES_STATS, {
    variables: { teamId, seasonId },
  });

  useEffect(() => {
    if (seasonId) {
      matchStats();
    }
  }, [matchStats, seasonId]);

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <SectionContainer title="Current Season">
      {data?.stats && !data?.stats?.total ? (
        <CustomTypography color="warning">No matches yet</CustomTypography>
      ) : (
        <>
          <MatchStatsTable stats={data?.stats} />
          <Averages stats={data?.stats} loading={loading} />
        </>
      )}
    </SectionContainer>
  );
};

export default MatchStats;
