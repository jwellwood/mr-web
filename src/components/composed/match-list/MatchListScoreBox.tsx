import { getPoints } from '../../../modules/matches/helpers';
import { theme } from '../../../theme';
import { ResultDecision } from '../../../types/__generated__/graphql';
import { getOpaqueValue } from '../../../utils';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../typography';
import TiebreakerText from '../TiebreakerText';

interface Props {
  teamGoals: number;
  opponentGoals: number;
  decidedBy?: string | null;
  isWinnerSide?: boolean;
  loading?: boolean;
}

export default function MatchListScoreBox({
  teamGoals,
  opponentGoals,
  isWinnerSide,
  decidedBy,
  loading,
}: Props) {
  const { palette } = theme;

  const points = getPoints(teamGoals, opponentGoals);
  let color = '';
  let background = '';
  switch (true) {
    case points === 3 || isWinnerSide:
      color = palette.success.dark;
      background = getOpaqueValue(palette.success.dark);
      break;
    case points === 1 && !decidedBy:
      color = palette.warning.main;
      background = getOpaqueValue(palette.warning.main);
      break;
    case points === 0 || !isWinnerSide:
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
        {teamGoals} - {opponentGoals}{' '}
        {decidedBy ? <TiebreakerText tiebreakType={decidedBy as ResultDecision} size="xs" /> : null}
      </CustomTypography>
    </div>
  );
}
