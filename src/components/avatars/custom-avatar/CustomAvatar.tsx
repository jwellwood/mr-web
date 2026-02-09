import Avatar from '@mui/material/Avatar';
import React from 'react';
import { getThemeColorByType } from '../../../utils';
import CustomSkeleton from '../../loaders/CustomSkeleton';

interface Props {
  children?: React.ReactNode;
  size?: string;
  border?: string;
  shadow?: string;
  alt?: string;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function CustomAvatar({
  children,
  border,
  shadow,
  size = '30px',
  alt,
  loading,
  onClick,
}: Props) {
  const borderColor = getThemeColorByType(border);
  const shadowColor = getThemeColorByType(shadow);

  return loading ? (
    <CustomSkeleton variant="circular" width={size} height={size} margin="0" />
  ) : (
    <Avatar
      onClick={onClick}
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
