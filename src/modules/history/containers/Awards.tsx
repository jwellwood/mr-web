import { useQuery } from '@apollo/client';

import { FETCH_AWARDS } from '../graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { Spinner } from '../../../components/loaders';
import AwardList from '../components/AwardList';

export default function Awards() {
  const { seasonId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_AWARDS, {
    variables: { seasonId },
  });

  const renderContent = () => {
    return !loading ? <AwardList awards={data?.awards || []} /> : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
