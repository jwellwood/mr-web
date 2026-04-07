import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import { FETCH_RESULT } from '../graphql';
import ResultPage from '../pages/ResultPage';

export default function Result() {
  const { resultId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_RESULT, {
    variables: { resultId: resultId! },
  });

  return <ResultPage data={data} loading={loading} error={error} />;
}
