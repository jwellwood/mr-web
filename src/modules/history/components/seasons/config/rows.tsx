import { CustomTypography } from '../../../../../components';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import { T_FETCH_SEASONS_POSITION } from '../../../types';
import ProgressBar from '../../../../../components/charts/progress-bar/ProgressBar';
import FinalPosition from '../FinalPosition';
import SeasonAwards from '../SeasonAwards';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const rows = (data?: T_FETCH_SEASONS_POSITION['position'], loading?: boolean) => {
  const arr = new Array(15).fill({});
  const mappedData = loading || !data?.length ? arr : data;

  return mappedData?.map(item => {
    const { seasonId, name, division, position, totalFinalPositions } =
      item as T_FETCH_SEASONS_POSITION['position'] extends Array<infer U> ? U : never;

    return {
      name: loading ? (
        <CustomSkeleton width="50px" />
      ) : (
        <Box
          component={Link}
          to={`season/${seasonId}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <CustomTypography size="xs" color="data" bold>
            {name}
          </CustomTypography>
        </Box>
      ),
      division: loading ? (
        <CustomSkeleton width="100px" />
      ) : (
        <CustomTypography size="sm" color="data" bold>
          {division || '-'}
        </CustomTypography>
      ),

      graph: loading ? (
        <CustomSkeleton width="150px" />
      ) : position ? (
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
