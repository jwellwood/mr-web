import React from 'react';
import Avatar from '@mui/material/Avatar';

import CustomSkeleton from '../../loaders/CustomSkeleton';
import { getThemeColorByType } from '../../../utils';

interface Props {
  children?: React.ReactNode;
  size?: string;
  border?: string;
  shadow?: string;
  alt?: string;
  loading?: boolean;
}

export default function CustomAvatar({
  children,
  border,
  shadow,
  size = '30px',
  alt,
  loading,
}: Props) {
  const borderColor = getThemeColorByType(border);
  const shadowColor = getThemeColorByType(shadow);

  return loading ? (
    <CustomSkeleton variant="circular" width={size} height={size} margin="0" />
  ) : (
    <Avatar
      alt={alt}
      sx={{
        height: size,
        width: size,
        bgcolor: 'transparent',
        fontWeight: 'bold',
        border: border ? `2px ${borderColor} solid` : '0px',
        boxShadow: shadow ? `0px 0px 5px 2px ${shadowColor}` : '',
      }}
    >
      {children}
    </Avatar>
  );
}
