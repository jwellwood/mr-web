import { useTranslation } from 'react-i18next';
import { DataError, ModuleHeader, PositionText } from '../../../../components';
import { IMAGE_TYPE } from '../../../../constants';
import { useDateOfBirth } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYER } from '../../graphql';

interface Props {
  data?: T_FETCH_PLAYER;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerView({ data, loading, error }: Props) {
  const { t } = useTranslation('players');
  const { age } = useDateOfBirth(data?.player?.dateOfBirth as string);

  const dataToDisplay = [
    {
      label: '',
      value: <PositionText>{data?.player.position || '-'}</PositionText>,
    },
    { label: '', value: `#${data?.player.squadNumber || '-'}` },
    { label: '', value: `${age} ${t('YEARS')}` },
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
