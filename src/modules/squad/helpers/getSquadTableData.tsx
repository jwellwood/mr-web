import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';
import FlagIcon from '../../../components/icons/FlagIcon';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../components/loaders/StatSkeleton';
import NameCell from '../../../components/tables/NameCell';
import { IPlayerInMatch } from '../../matches/types';
import { POSITIONS } from '../../players/constants';
import { IPlayer } from '../../players/types';

interface Args {
  players: IPlayer[];
  playersLoading: boolean;
  stats: IPlayerInMatch[];
  statsLoading: boolean;
}

type PlayerWithStats = IPlayer & IPlayerInMatch;

export const getSquadTableData = ({ players, stats, playersLoading, statsLoading }: Args) => {
  const arr = new Array(4).fill({});
  const mappedPlayers =
    playersLoading || !players
      ? arr
      : players?.map((player): PlayerWithStats => {
          const playerStats = statsLoading
            ? arr.find(stat => stat._id === player._id)
            : stats?.find(stat => stat._id === player._id);
          return { ...player, ...playerStats };
        });

  return mappedPlayers.map(player => {
    const { _id, squadNumber, position, nationality, image, name, apps, goals, assists } =
      player || {};
    return {
      number: squadNumber,
      position: POSITIONS[position as keyof typeof POSITIONS],
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
        value: <NameCell id={_id}>{name || <CustomSkeleton width="100px" />}</NameCell>,
      },
      apps: +apps || 0,
      goals: +goals || 0,
      assists: +assists || 0,
    };
  });
};
