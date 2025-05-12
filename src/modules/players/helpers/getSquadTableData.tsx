import CustomAvatar from '../../../components/avatars/CustomAvatar';
import FlagIcon from '../../../components/icons/FlagIcon';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../components/loaders/StatSkeleton';
import NameCell from '../../../components/tables/NameCell';
import { IPlayer, IPlayerInMatch } from '../../../types';
import { POSITIONS } from '../constants';

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
    const { _id, squadNumber, nationality, image, name, apps, goals, assists } = player || {};
    return {
      number: squadNumber,
      position: POSITIONS,

      nationality: {
        value:
          nationality !== undefined ? <FlagIcon nationality={nationality} /> : <StatSkeleton />,
      },
      image: {
        value: image?.url ? (
          <CustomAvatar
            size="28px"
            iconSize="24px"
            centered
            imageUrl={image?.url}
            alt={`${name} profile`}
          />
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
