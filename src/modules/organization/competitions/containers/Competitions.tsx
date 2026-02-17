import { useQuery } from '@apollo/client/react';
import { DataError } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { FETCH_ORG } from '../../org/graphql';
import CompetitionsList from '../components/CompetitionsList';

export default function Competitions() {
  const { orgId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_ORG, {
    variables: { orgId: orgId! },
  });

  const renderContent = () => {
    return !loading ? <CompetitionsList competitions={data?.org.competitions} /> : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
