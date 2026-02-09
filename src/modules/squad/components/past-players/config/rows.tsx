import { ImageAvatar, NameCell } from '../../../../../components';
import { FlagIcon } from '../../../../../components/icons';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { FETCH_PAST_PLAYERS_QUERY } from '../../../types';

export const rows = (data?: FETCH_PAST_PLAYERS_QUERY, loading?: boolean) => {
  const arr = new Array(15).fill({});
  const mappedPlayers = loading || !data?.players ? arr : data?.players.map(player => player);

  return mappedPlayers?.map(player => ({
    position: loading ? <StatSkeleton /> : player.position,
    nationality: { value: <FlagIcon nationality={player.nationality} loading={loading} /> },
    image: {
      value: (
        <ImageAvatar
          loading={loading}
          size="30px"
          centered
          imageUrl={player.image || ''}
          alt={`${player.name} profile`}
          fallbackIcon="user"
        />
      ),
    },
    name: {
      value: (
        <NameCell id={player._id} loading={loading}>
          {player.name}
        </NameCell>
      ),
    },
    joined: loading ? <StatSkeleton /> : player.joined,
    left: loading ? <StatSkeleton /> : player.left,
    seasons: loading ? <StatSkeleton /> : player.seasons,
  }));
};
