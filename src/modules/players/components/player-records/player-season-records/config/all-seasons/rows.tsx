import { NameCell } from '../../../../../../../components';
import StatSkeleton from '../../../../../../../components/loaders/StatSkeleton';
import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../../../types';

export const rows = (data?: T_FETCH_PLAYER_SEASONS_SUMMARY['seasons'], loading?: boolean) => {
  const arr = new Array(15).fill({});

  const mappedSeasons = loading || !data ? arr : data;

  return mappedSeasons?.map(season => ({
    season: {
      value: (
        <NameCell id={season?.seasonId} loading={loading}>
          {season?.seasonName}
        </NameCell>
      ),
    },
    apps: loading ? <StatSkeleton /> : season?.apps,
    goals: loading ? <StatSkeleton /> : season.goals,
    assists: loading ? <StatSkeleton /> : season.assists,
    combined: loading ? <StatSkeleton /> : season.goals + season.assists,
  }));
};
