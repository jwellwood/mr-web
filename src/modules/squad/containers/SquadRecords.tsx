import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_RECORDS } from '../graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import Records from '../components/Records';

export default function SquadRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_RECORDS, {
    variables: { teamId },
  });

  return error ? <ErrorGraphql error={error} /> : <Records data={data?.stats} loading={loading} />;
}
