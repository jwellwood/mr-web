import { getPercentage } from '../../../utils/helpers';
import { theme } from '../../../theme';
import { CustomTypography } from '../../../components/typography';

type Props = {
  max: number;
  value: number;
  text?: string;
};

export default function ProgressBar({ max, value, text }: Props) {
  const calcPercentage = () => {
    if (value === max) {
      return 95;
    }
    if (value === 1) {
      return 0;
    }
    return getPercentage(value, max);
  };

  return (
    <div
      style={{
        width: '130px',
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
