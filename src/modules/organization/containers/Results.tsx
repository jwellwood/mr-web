import { useQuery } from '@apollo/client';

import { FETCH_RESULTS } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { Spinner } from '../../../components/loaders';
import ResultsAccordion from '../components/ResultsAccordion';
import { DataError, NoDataText } from '../../../components';

export default function Results() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_RESULTS, {
    variables: { orgId, orgSeasonId: orgSeasonId || 'default' },
  });

  const renderData = data?.results.length ? (
    <ResultsAccordion
      results={data?.results}
      orgId={orgId as string}
      orgSeasonId={orgSeasonId || 'default'}
    />
  ) : (
    <NoDataText>No results yet</NoDataText>
  );

  const renderContent = () => {
    return !loading && data?.results ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
