import React from 'react';
import { Skeleton } from '@mui/material';

interface Props {
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  height?: string;
  width?: string;
  margin?: string;
}

const CustomSkeleton: React.FC<Props> = ({
  variant = 'rounded',
  height,
  width = '100%',
  margin,
}) => {
  return (
    <Skeleton
      variant={variant}
      height={height}
      width={width}
      sx={{ background: 'rgba(255,255,255,0.2)', margin: margin || 'auto' }}
    />
  );
};

export default CustomSkeleton;
