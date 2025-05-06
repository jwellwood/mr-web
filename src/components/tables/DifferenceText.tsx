import React from 'react';
import { CustomTypography } from '../typography';

type Props = {
  stat: number;
};

const DifferenceText: React.FC<Props> = ({ stat }) => {
  let symbol = '';
  let color = 'data';
  if (stat > 0) {
    color = 'success';
    symbol = '+';
  }
  if (stat < 0) {
    color = 'error';
    symbol = '';
  }
  return (
    <CustomTypography bold color={color} size="xs">
      {symbol}
      {stat}
    </CustomTypography>
  );
};

export default DifferenceText;
