import { CustomAvatar, CustomTypography } from '../../../../components';
import StatSkeleton from '../../../../components/loaders/StatSkeleton';

interface Props {
  position?: number;
  loading?: boolean;
}

export default function FinalPosition({ position, loading }: Props) {
  const getPositionColor = () => {
    let color = 'secondary';
    switch (true) {
      case position === 1:
        color = 'gold';
        break;
      case position === 2:
        color = 'silver';
        break;
      case position === 3:
        color = 'bronze';
        break;
      default:
        break;
    }
    return color;
  };

  const renderDisplay = position ? (
    <CustomAvatar border={getPositionColor()}>
      <CustomTypography color="data" size="sm" bold>
        {position}
      </CustomTypography>
    </CustomAvatar>
  ) : (
    '-'
  );

  return loading ? <StatSkeleton /> : renderDisplay;
}
