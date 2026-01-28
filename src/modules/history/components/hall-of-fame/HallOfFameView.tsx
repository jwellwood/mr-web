import { ApolloError } from '@apollo/client';

import { DataError, NoDataText } from '../../../../components';
import HallOfFamePlayer from './HallOfFamePlayer';
import { T_FETCH_HALL_OF_FAME } from '../../types';

interface Props {
  data?: T_FETCH_HALL_OF_FAME;
  loading: boolean;
  error?: ApolloError;
}

export default function HallOfFameView({ data, loading, error }: Props) {
  const arr = new Array(15).fill({
    _id: '',
    name: '',
    image: { url: '' },
    position: '',
    nationality: '',
  });
  const mappedPlayers = loading ? arr : data?.players;

  const renderContent = () => {
    return data?.players && data?.players.length === 0 ? (
      <NoDataText>No hall of fame players yet</NoDataText>
    ) : (
      mappedPlayers?.map((player, i) => (
        <HallOfFamePlayer key={player.id || i} player={player} loading={loading} />
      ))
    );
  };

  return <>{error ? <DataError error={error} /> : renderContent()}</>;
}
