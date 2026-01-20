import { ApolloError } from '@apollo/client';

import { ITeamSeason } from '../types';
import { DataError } from '../../../components';
import { Spinner } from '../../../components/loaders';
import SeasonTabs from '../components/SeasonTabs';

interface Props {
  data?: { season: ITeamSeason };
  loading: boolean;
  error?: ApolloError;
}

export default function SeasonView({ data, loading, error }: Props) {
  const renderContent = () => (loading ? <Spinner /> : <SeasonTabs season={data?.season} />);

  return error ? <DataError error={error} /> : renderContent();
}
