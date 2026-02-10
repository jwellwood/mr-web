import { DataError } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_TROPHY } from '../../types';
import TrophyDetails from './TrophyDetails';

interface Props {
  data?: T_FETCH_TROPHY;
  loading: boolean;
  error?: TApolloError;
}

export default function TrophyView({ data, loading, error }: Props) {
  return error ? (
    <DataError error={error} />
  ) : (
    <TrophyDetails trophy={data?.trophy} loading={loading} />
  );
}
