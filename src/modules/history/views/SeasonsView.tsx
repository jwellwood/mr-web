import { ApolloError } from '@apollo/client';

import { ILeaguePositions } from '../types';
import { DataError, NoDataText } from '../../../components';
import SeasonsGraph from '../components/SeasonsGraph';
import { Spinner } from '../../../components/loaders';

type Props = {
  data?: { position: ILeaguePositions[] };
  loading: boolean;
  error?: ApolloError;
};

export default function SeasonsView({ data, loading, error }: Props) {
  const renderContent = () => {
    return !loading ? (
      data?.position.length === 0 ? (
        <NoDataText>No seasons yet</NoDataText>
      ) : (
        <SeasonsGraph data={data?.position} />
      )
    ) : (
      <Spinner />
    );
  };
  return error ? <DataError error={error} /> : renderContent();
}
