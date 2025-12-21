import { ImageAvatar, NameCell } from '../../../../../components';
import FlagIcon from '../../../../../components/icons/FlagIcon';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { POSITIONS } from '../../../../players/constants';
import { ISquadListStats } from '../../../types';

export const rows = (data?: { players: ISquadListStats[] }, loading?: boolean) => {
  const arr = new Array(15).fill({});
  const mappedPlayers =
    loading || !data?.players.length ? arr : data?.players.map(player => player);

  return mappedPlayers.map(player => {
    const { _id, number, position, nationality, image, name, apps, goals, assists } = player || {};
    return {
      number: number || <StatSkeleton />,
      position: POSITIONS[position as keyof typeof POSITIONS] || <StatSkeleton />,
      nationality: {
        value:
          nationality !== undefined ? <FlagIcon nationality={nationality} /> : <StatSkeleton />,
      },
      image: {
        value: image?.url ? (
          <ImageAvatar size="28px" centered imageUrl={image?.url} alt={`${name} profile`} />
        ) : (
          <CustomSkeleton variant="circular" width="28px" height="28px" />
        ),
      },
      name: {
        value: (
          <NameCell id={_id} loading={loading}>
            {name || ''}
          </NameCell>
        ),
      },
      apps: loading ? <StatSkeleton /> : +apps,
      goals: loading ? <StatSkeleton /> : +goals,
      assists: loading ? <StatSkeleton /> : +assists,
    };
  });
};
