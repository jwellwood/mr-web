import CustomSkeleton from '../../../loaders/CustomSkeleton';
import { CustomTypography } from '../../../typography';
import { getPoints } from '../../../../modules/matches/helpers';
import { theme } from '../../../../theme';
import { getOpaqueValue } from '../../../../utils/colors/getOpaqueValue';

interface Props {
  teamGoals: number;
  opponentGoals: number;
  loading?: boolean;
}

export default function MatchListScoreBox({ teamGoals, opponentGoals, loading }: Props) {
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
}
