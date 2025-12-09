import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_ALL_TIME_STATS } from '../graphql';
import { SectionContainer } from '../../../components';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchStatsTable from '../components/MatchStatsTable.tsx';
import Averages from '../components/Averages.tsx';

export default function AllTimeMatchStats() {
  const { teamId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_MATCHES_ALL_TIME_STATS, {
    variables: { teamId },
  });

  const renderContent = () => {
    return data?.stats && !data?.stats?.total ? (
      <CustomTypography color="warning">No matches yet</CustomTypography>
    ) : (
      <SectionContainer title="All time">
        <MatchStatsTable stats={data?.stats} />
        <Averages stats={data?.stats} loading={loading} />
      </SectionContainer>
    );
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
