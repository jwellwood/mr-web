import { useQuery } from '@apollo/client/react';
import { DataError, NoDataText } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TAB_TYPES } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import CompetitionTabs from '../components/CompetitionTabs';
import { FETCH_FIXTURES } from '../graphql';

export default function Fixtures() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_FIXTURES, {
    variables: { orgId: orgId!, orgSeasonId: orgSeasonId || 'default' },
  });

  const renderData = data?.fixtures.length ? (
    <CompetitionTabs matches={data.fixtures} type={TAB_TYPES.FIXTURES_COMPETITIONS} />
  ) : (
    <NoDataText>No fixtures yet</NoDataText>
  );

  const renderContent = () => {
    return !loading && data?.fixtures ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
