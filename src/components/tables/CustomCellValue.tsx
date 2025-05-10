import React from 'react';
import { CustomTypography } from '../typography';
import DifferenceText from './DifferenceText';

type Props = {
  value: unknown | number;
  isDifference: boolean;
  isPercentage?: boolean;
  textColor?: string;
};

const CustomCellValue: React.FC<Props> = ({
  value,
  isDifference,
  isPercentage,
  textColor,
}) => {
  if (isDifference) {
    return <DifferenceText stat={value as number} />;
  }

  if (typeof value === 'number') {
    const formattedValue = isNaN(value) ? 0 : +value;
    return (
      <CustomTypography bold color={textColor || "black"} size="xs">
        {formattedValue}
        {isPercentage && '%'}
      </CustomTypography>
    );
  }
  if (typeof value === 'string') {
    return (
      <CustomTypography bold color={textColor || "black"} size="xs">
        {value}
        {isPercentage && '%'}
      </CustomTypography>
    );
  }
  return (
    <>
      {value}
      {isPercentage && '%'}
    </>
  );
};

export default CustomCellValue;
