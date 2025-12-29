import { ApolloError } from '@apollo/client';

import { useDateOfBirth } from '../../../hooks';
import { DataError, ModuleHeader, PositionCell } from '../../../components';
import { IMAGE_TYPE } from '../../../constants';
import { IPlayer } from '../types';

interface Props {
  data?: { player: IPlayer };
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerView({ data, loading, error }: Props) {
  const { age } = useDateOfBirth(data?.player?.dateOfBirth);

  const dataToDisplay = [
    {
      label: '',
      value: <PositionCell>{data?.player.position || '-'}</PositionCell>,
    },
    { label: '', value: `#${data?.player.squadNumber || '-'}` },
    { label: '', value: `${age} years` },
  ];

  return error ? (
    <DataError error={error} />
  ) : (
    <ModuleHeader
      title={data?.player.name || ''}
      badge={data?.player.image.url || ''}
      data={dataToDisplay}
      country={data?.player.nationality || ''}
      type={IMAGE_TYPE.USER}
      loading={loading}
    />
  );
}
