import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import defaultBadge from 'assets/images/badge.png';

interface Props {
  image: string;
  size?: string;
  alt?: string;
  isPlayer?: boolean;
}

const SquareImage: React.FC<Props> = ({ image, size, alt, isPlayer }) => {
  if (!isPlayer && image === 'default') {
    image = defaultBadge;
  }

  const PREFIX = 'SquareImage';
  const classes = {
    image: `${PREFIX}-image`,
    fallback: `${PREFIX}-fallback`,
  };

  const StyledRoot = styled('div')(({ theme }) => ({
    [`& .${classes.image}`]: {
      color: theme.palette.secondary.light,
      background: 'rgba(0, 0, 0, 0)',
      objectFit: 'contain',
      width: '160px',
      height: '160px',
    },
    [`& .${classes.fallback}`]: {
      width: size || '160px',
      height: size || '160px',
      color: theme.palette.secondary.light,
      background: theme.palette.primary.light,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  }));
  return (
    <StyledRoot>
      <Box>
        {image ? (
          <img src={image} className={classes.image} alt={alt || ''} />
        ) : (
          <div className={classes.fallback} />
        )}
      </Box>
    </StyledRoot>
  );
};

export default SquareImage;
