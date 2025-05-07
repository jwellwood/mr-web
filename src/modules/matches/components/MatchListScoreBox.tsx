import React from 'react';
import CustomSkeleton from 'components/loaders/CustomSkeleton';
import { CustomTypography } from 'components/typography';
import { theme } from 'theme';
import { getOpaqueValue } from 'utils/colors/getOpaqueValue';
import { getPoints } from '../helpers';

type Props = {
  teamGoals: number;
  opponentGoals: number;
  loading: boolean;
};

const MatchListScoreBox: React.FC<Props> = ({
  teamGoals,
  opponentGoals,
  loading,
}) => {
  const { palette } = theme;

  const points = getPoints(teamGoals, opponentGoals);
  let color = '';
  let background = '';
  switch (points) {
    case 3:
      color = palette.success.dark;
      background = getOpaqueValue(palette.success.dark);
      break;
    case 1:
      color = palette.warning.main;
      background = getOpaqueValue(palette.warning.main);
      break;
    case 0:
      color = palette.error.main;
      background = getOpaqueValue(palette.error.main);
      break;

    default:
      break;
  }

  return loading ? (
    <CustomSkeleton width="40px" height="40px" />
  ) : (
    <div
      style={{
        width: '70px',
        padding: '4px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        border: `${color} 2px solid`,
        background: background,
      }}
    >
      <CustomTypography color="data" bold size="xs">
        {teamGoals} - {opponentGoals}
      </CustomTypography>
    </div>
  );
};

export default MatchListScoreBox;
