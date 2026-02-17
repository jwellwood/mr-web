import { useQuery } from '@apollo/client/react';
import { DataError, NoDataText } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import ResultsAccordion from '../components/ResultsAccordion';
import { FETCH_RESULTS } from '../graphql';

export default function Results() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_RESULTS, {
    variables: { orgId: orgId!, orgSeasonId: orgSeasonId || 'default' },
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
