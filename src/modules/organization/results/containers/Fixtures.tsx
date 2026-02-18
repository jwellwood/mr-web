import { useQuery } from '@apollo/client/react';
import { DataError, NoDataText } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import FixturesAccordion from '../components/FixturesAccordion';
import { FETCH_FIXTURES } from '../graphql';

export default function Fixtures() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_FIXTURES, {
    variables: { orgId: orgId!, orgSeasonId: orgSeasonId || 'default' },
  });

  const renderData = data?.fixtures?.length ? (
    <FixturesAccordion
      results={data?.fixtures}
      orgId={orgId as string}
      orgSeasonId={orgSeasonId || 'default'}
    />
  ) : (
    <NoDataText>No fixtures yet</NoDataText>
  );

  const renderContent = () => {
    return !loading && data?.fixtures ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
