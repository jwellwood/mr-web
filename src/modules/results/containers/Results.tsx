import { useQuery } from '@apollo/client/react';
import { DataError, NoDataText } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TAB_TYPES } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import CompetitionTabs from '../components/CompetitionTabs';
import { FETCH_RESULTS } from '../graphql';

export default function Results() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_RESULTS, {
    variables: { orgId: orgId!, orgSeasonId: orgSeasonId || 'default' },
  });

  const renderData = data?.results.length ? (
    <CompetitionTabs matches={data.results} type={TAB_TYPES.RESULTS_COMPETITIONS} />
  ) : (
    <NoDataText>No results yet</NoDataText>
  );

  const renderContent = () => {
    return !loading && data?.results ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
