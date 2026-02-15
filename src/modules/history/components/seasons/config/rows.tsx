import ProgressBar from '../../../../../components/charts/progress-bar/ProgressBar';
import { T_FETCH_SEASONS_POSITION } from '../../../types';
import FinalPosition from '../FinalPosition';
import SeasonAwards from '../SeasonAwards';

export const rows = (data?: T_FETCH_SEASONS_POSITION['position'], loading?: boolean) => {
  const arr = new Array(15).fill({});
  const mappedData = loading || !data?.length ? arr : data;

  return mappedData?.map(item => {
    const { seasonId, name, division, position, totalFinalPositions } =
      item as T_FETCH_SEASONS_POSITION['position'] extends Array<infer U> ? U : never;

    return {
      name: { value: name, link: `season/${seasonId}` },
      division: division || '-',
      graph: position ? (
        <ProgressBar
          max={totalFinalPositions || 10}
          value={position}
          width={90}
          loading={loading}
        />
      ) : (
        '-'
      ),
      pos: <FinalPosition position={position || 0} loading={loading} />,
      more: (
        <SeasonAwards
          seasonId={seasonId || ''}
          name={name || ''}
          position={position || 0}
          loading={loading}
        />
      ),
    };
  });
};
