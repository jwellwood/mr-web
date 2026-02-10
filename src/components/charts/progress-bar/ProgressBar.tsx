import { theme } from '../../../theme';
import { getPercentage } from '../../../utils';
import CustomSkeleton from '../../loaders/CustomSkeleton';
import { CustomTypography } from '../../typography';

interface Props {
  max: number;
  value: number;
  text?: string;
  width?: number;
  loading?: boolean;
}

export default function ProgressBar({ max, value, text, width = 130, loading }: Props) {
  const calcPercentage = () => {
    if (value === max) {
      return 95;
    }
    if (value === 1) {
      return 0;
    }
    return getPercentage(value, max);
  };

  return loading ? (
    <CustomSkeleton width={`${width}px`} />
  ) : (
    <div
      style={{
        width: `${width}px`,
        background: theme.palette.secondary.main,
      }}
    >
      <div
        style={{
          width: `${100 - calcPercentage()}%`,
          height: '8px',
          background: value === 1 ? theme.palette.gold.main : theme.palette.primary.light,
        }}
      />
      <CustomTypography size="xxs" color="data">
        {text}
      </CustomTypography>
    </div>
  );
}
