import { ApolloError } from '@apollo/client';

import { T_FETCH_SEASON } from '../../types';
import { DataError } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import SeasonTabs from './SeasonTabs';

interface Props {
  data?: T_FETCH_SEASON;
  loading: boolean;
  error?: ApolloError;
}

export default function SeasonView({ data, loading, error }: Props) {
  const renderContent = () => (loading ? <Spinner /> : <SeasonTabs season={data?.season} />);

  return error ? <DataError error={error} /> : renderContent();
}
