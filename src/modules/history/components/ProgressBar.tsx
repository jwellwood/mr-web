import React from 'react';
import { getPercentage } from '../../../utils/helpers';
import { theme } from '../../../theme';

type Props = {
  max: number;
  value: number;
};

const ProgressBar: React.FC<Props> = ({ max, value }) => {
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
    <div style={{ width: '130px', background: theme.palette.secondary.main }}>
      <div
        style={{
          width: `${100 - calcPercentage()}%`,
          height: '8px',
          background: value === 1 ? theme.palette.gold.main : theme.palette.primary.light,
        }}
      />
    </div>
  );
};

export default ProgressBar;
