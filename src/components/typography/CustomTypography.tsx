import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { theme } from '../../theme';

interface Props {
  children: React.ReactNode;
  color: string;
  size?: string;
  font?: string;
  bold?: boolean;
  div?: boolean;
  ariaLabel?: string;
  role?: string;
  link?: string;
}

const CustomTypography: React.FC<Props> = ({
  children,
  color,
  size,
  bold,
  div,
  ariaLabel,
  role,
  link,
}) => {
  const {
    typography: { fontFamily },
    palette: {
      primary,
      secondary,
      tertiary,
      success,
      warning,
      error,
      common,
      data,
      label,
      gold,
      silver,
      bronze,
    },
  } = theme;
  let fontSize = '14px';
  let textColor = primary.main;
  const textFont = theme.typography.secondaryFont || fontFamily || 'Roboto';
  const textWeight = bold ? 'bold' : 'normal';
  const componentType = div ? 'div' : 'span';

  switch (color) {
    case 'label':
      textColor = label.main;
      break;
    case 'data':
      textColor = data.main;
      break;
    case 'primary':
      textColor = primary.main;
      break;
    case 'secondary':
      textColor = secondary.main;
      break;
    case 'tertiary':
      textColor = tertiary.main;
      break;
    case 'success':
      textColor = success.main;
      break;
    case 'warning':
      textColor = warning.main;
      break;
    case 'error':
      textColor = error.main;
      break;
    case 'primary-light':
      textColor = primary.light;
      break;
    case 'primary-dark':
      textColor = primary.dark;
      break;
    case 'white':
      textColor = common.white;
      break;
    case 'gold':
      textColor = gold.main;
      break;
    case 'silver':
      textColor = silver.main;
      break;
    case 'bronze':
      textColor = bronze.main;
      break;
    default:
      textColor = color;
      break;
  }

  switch (size) {
    case 'xs':
      fontSize = '12px';
      break;
    case 'xxs':
      fontSize = '10px';
      break;
    case 'sm':
      fontSize = '14px';
      break;
    case 'md':
      fontSize = '16px';
      break;
    case 'lg':
      fontSize = '24px';
      break;
    case 'xl':
      fontSize = '32px';
      break;
    default:
      break;
  }

  return (
    <Typography
      aria-label={ariaLabel}
      role={role}
      style={{
        color: textColor,
        fontFamily: textFont,
        fontSize: fontSize,
        fontWeight: textWeight,
        textDecoration: 'none',
      }}
      component={link ? Link : componentType}
      to={link}
    >
      {children}
    </Typography>
  );
};

export default CustomTypography;
