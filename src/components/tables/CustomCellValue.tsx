import React from 'react';
import { CustomTypography } from '../typography';
import DifferenceCell from './difference-cell/DifferenceCell';

type Props = {
  value: unknown | number;
  isDifference: boolean;
  isPercentage?: boolean;
  textColor?: string;
  textAlign?: 'left' | 'center' | 'right';
};

const CustomCellValue: React.FC<Props> = ({ value, isDifference, isPercentage, textColor }) => {
  if (isDifference) {
    return <DifferenceCell stat={value as number} />;
  }

  if (typeof value === 'number') {
    const formattedValue = isNaN(value) ? 0 : +value;
    return (
      <CustomTypography bold color={textColor || 'black'} size="xs">
        {formattedValue}
        {isPercentage && '%'}
      </CustomTypography>
    );
  }
  if (typeof value === 'string') {
    return (
      <CustomTypography bold color={textColor || 'black'} size="xs">
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
