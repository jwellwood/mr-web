import { CustomTypography } from '../../../../../components';
import CustomSkeleton from '../../../../../components/loaders/CustomSkeleton';
import { ILeaguePositions } from '../../../types';
import ProgressBar from '../../../../../components/charts/progress-bar/ProgressBar';
import FinalPosition from '../components/FinalPosition';
import SeasonAwards from '../components/SeasonAwards';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const rows = (data?: ILeaguePositions[], loading?: boolean) => {
  const arr = new Array(15).fill({});
  const mappedData = loading || !data?.length ? arr : data;

  return mappedData?.map(item => {
    const { seasonId, name, division, position, totalFinalPositions } = item as ILeaguePositions;

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
          {division}
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
      pos: <FinalPosition position={position} loading={loading} />,
      more: <SeasonAwards seasonId={seasonId} name={name} position={position} loading={loading} />,
    };
  });
};
