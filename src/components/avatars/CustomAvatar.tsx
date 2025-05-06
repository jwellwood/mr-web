import React, { ReactElement } from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IMAGE_TYPE } from 'app/constants';
import AppIcon from '../icons/AppIcon';
import { IIconType } from '../icons/types';
import CustomSkeleton from '../loaders/CustomSkeleton';
import { theme } from 'theme';
import { getThemeColorByType } from 'utils';

const {
  typography: { secondaryFont },
} = theme;

interface Props {
  children?: React.ReactNode;
  size?: string;
  iconSize?: string;
  onClick?: () => void;
  border?: string;
  isList?: boolean;
  shadow?: string;
  background?: string;
  centered?: boolean;
  imageUrl?: string;
  alt?: string;
  type?: IMAGE_TYPE;
  loading?: boolean;
}

const CustomAvatar = ({
  children,
  onClick,
  border,
  isList,
  background,
  centered,
  shadow,
  size,
  iconSize,
  imageUrl,
  alt,
  type,
  loading,
}: Props): ReactElement => {
  const backgroundColor = getThemeColorByType(background);
  const borderColor = getThemeColorByType(border);
  const shadowColor = getThemeColorByType(shadow);

  const avatar = loading ? (
    <CustomSkeleton variant="circular" width={size} height={size} margin="0" />
  ) : (
    <Avatar
      src={imageUrl || null}
      alt={alt}
      onClick={onClick}
      style={{
        width: size || '',
        height: size || '',
        fontWeight: 'bold',
        fontFamily: secondaryFont.fontFamily,
        backgroundColor,
        margin: centered ? 'auto' : 'inherit',
        border: border ? `2px ${borderColor} solid` : '0px',
        boxShadow: shadow ? `0px 0px 5px 2px ${shadowColor}` : '',
      }}
    >
      {children}
    </Avatar>
  );

  if (imageUrl === 'default') {
    let icon: IIconType = 'user';
    if (type === IMAGE_TYPE.TEAM) icon = 'team';
    if (type === IMAGE_TYPE.ORG) icon = 'profile';
    return (
      <Avatar
        sx={{ display: 'flex' }}
        style={{
          background: 'transparent',
          border:
            icon === 'team' ? `${theme.palette.secondary.main} 2px solid` : '',
          color: theme.palette.secondary.light,
          margin: centered ? 'auto' : '',
          width: size || '',
          height: size || '',
        }}
      >
        <AppIcon
          icon={icon}
          size={iconSize || ''}
          color={theme.palette.label.main}
        />
      </Avatar>
    );
  }

  return isList ? <ListItemAvatar>{avatar}</ListItemAvatar> : avatar;
};

export default CustomAvatar;
