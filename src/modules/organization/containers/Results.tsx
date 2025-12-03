import { useQuery } from '@apollo/client';

import { FETCH_RESULTS } from '../graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { Spinner } from '../../../components/loaders';
import ResultsAccordion from '../components/ResultsAccordion.tsx';
import { NoDataText } from '../../../components';

export default function Results() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_RESULTS, {
    variables: { orgId, orgSeasonId: orgSeasonId || 'default' },
  });

  const renderData = data?.results.length ? (
    <ResultsAccordion results={data?.results} />
  ) : (
    <NoDataText>No results yet</NoDataText>
  );

  const renderContent = () => {
    return !loading && data?.results ? renderData : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
