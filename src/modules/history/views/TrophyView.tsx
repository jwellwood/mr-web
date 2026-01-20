import { ApolloError } from '@apollo/client';

import { ITrophyResponse } from '../types';
import TrophyDetails from '../components/TrophyDetails';
import { DataError } from '../../../components';

interface Props {
  data?: { trophy: ITrophyResponse };
  loading: boolean;
  error?: ApolloError;
}

export default function TrophyView({ data, loading, error }: Props) {
  return error ? (
    <DataError error={error} />
  ) : (
    <TrophyDetails trophy={data?.trophy} loading={loading} />
  );
}
