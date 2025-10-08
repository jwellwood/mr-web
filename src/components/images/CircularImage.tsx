import React from 'react';
import { styled } from '@mui/material/styles';

import CustomAvatar from '../avatars/CustomAvatar';
import AppIcon from '../icons/AppIcon';
import type { IIconType } from '../icons/types';
import { type TImageType, ImageTypes } from '../../constants.ts';

interface Props {
  image?: string;
  size?: string;
  alt?: string;
  type?: TImageType;
}

const CircularImage: React.FC<Props> = ({ image, size, alt, type }) => {
  const PREFIX = 'CircularImage';
  const classes = {
    root: `${PREFIX}-root`,
    image: `${PREFIX}-image`,
  };

  const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
      margin: theme.spacing(1),
    },
    [`& .${classes.image}`]: {
      objectFit: 'cover',
      color: theme.palette.secondary.light,
      background: 'transparent',
      width: size || '150px',
      height: size || '150px',
      borderRadius: '50%',
      boxShadow: '0px 0px 30px -10px #fff',
    },
  }));
  if (image === 'default') {
    let icon: IIconType = 'user';
    if (type === ImageTypes.TEAM) icon = 'team';
    if (type === ImageTypes.ORG) icon = 'team';
    return (
      <div style={{ margin: '8px' }}>
        <CustomAvatar size={size} centered>
          <AppIcon size={'5rem'} icon={icon} />
        </CustomAvatar>
      </div>
    );
  }
  return (
    <Root className={classes.root}>
      <img src={image} className={classes.image} alt={alt || ''} />
    </Root>
  );
};

export default CircularImage;
