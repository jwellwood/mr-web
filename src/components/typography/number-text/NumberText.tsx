import { CustomTypography } from '..';

interface Props {
  value: number;
  isPercentage?: boolean;
}

export default function NumberText({ value, isPercentage }: Props) {
  const formattedValue = isNaN(value) ? 0 : +value;
  return (
    <CustomTypography bold size="xs">
      {formattedValue}
      {isPercentage && <CustomTypography size="xxs">%</CustomTypography>}
    </CustomTypography>
  );
}
