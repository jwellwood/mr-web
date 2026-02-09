import { ApolloError } from '@apollo/client';
import { DataError } from '../../../../components';
import { T_FETCH_TROPHY } from '../../types';
import TrophyDetails from './TrophyDetails';

interface Props {
  data?: T_FETCH_TROPHY;
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
