import { useQuery } from '@apollo/client';

import { FETCH_SEASONS_POSITION } from '../graphql';
import { SectionContainer } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SeasonsGraph from '../components/SeasonsGraph';

export default function Seasons() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SEASONS_POSITION, {
    variables: { teamId },
  });

  const renderContent = () => {
    return !loading ? (
      data?.position.length === 0 ? (
        <CustomTypography color="warning">No seasons yet</CustomTypography>
      ) : (
        <SeasonsGraph data={data?.position} />
      )
    ) : (
      <Spinner />
    );
  };

  return (
    <SectionContainer>{error ? <ErrorGraphql error={error} /> : renderContent()}</SectionContainer>
  );
}
