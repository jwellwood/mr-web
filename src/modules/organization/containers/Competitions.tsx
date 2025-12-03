import { useQuery } from '@apollo/client';

import { FETCH_ORG } from '../graphql';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import CompetitionsList from '../components/CompetitionsList.tsx';

export default function Competitions() {
  const { orgId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_ORG, {
    variables: { orgId: orgId },
  });

  const renderContent = () => {
    return !loading ? <CompetitionsList competitions={data?.org.competitions} /> : <Spinner />;
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
