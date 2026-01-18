import { NameCell } from '../../../../../components';
import StatSkeleton from '../../../../../components/loaders/StatSkeleton';
import { IPlayerSeasonsSummary } from '../../../types';

export const rows = (data?: IPlayerSeasonsSummary[], loading?: boolean) => {
  const arr = new Array(15).fill({});

  const mappedSeasons = loading || !data ? arr : data;

  return mappedSeasons?.map((season: IPlayerSeasonsSummary) => ({
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
