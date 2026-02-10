import { DataError } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_SEASON } from '../../types';
import SeasonTabs from './SeasonTabs';

interface Props {
  data?: T_FETCH_SEASON;
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonView({ data, loading, error }: Props) {
  const renderContent = () => (loading ? <Spinner /> : <SeasonTabs season={data?.season} />);

  return error ? <DataError error={error} /> : renderContent();
}
