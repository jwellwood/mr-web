import { ImageAvatar, NameCell } from '../../../../../components';
import FlagIcon from '../../../../../components/icons/FlagIcon';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { POSITIONS } from '../../../../../constants';
import { FETCH_SQUAD_LIST_BY_SEASON_QUERY } from '../../../types';

export const rows = (data?: FETCH_SQUAD_LIST_BY_SEASON_QUERY['players'], loading?: boolean) => {
  const arr = new Array(15).fill({});
  const mappedPlayers = loading ? arr : data;

  return mappedPlayers?.map(player => {
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
