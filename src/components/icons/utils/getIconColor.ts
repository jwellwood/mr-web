import { theme } from 'theme';

export const getIconColor = (color?: string) => {
  const {
    primary,
    secondary,
    success,
    error,
    warning,
    common,
    label,
    data,
    gold,
    silver,
    bronze,
  } = theme.palette;
  let iconColor = '';

  switch (color) {
    case 'label':
      iconColor = label.main;
      break;
    case 'data':
      iconColor = data.main;
      break;
    case 'primary':
      iconColor = primary.main;
      break;
    case 'primary-light':
      iconColor = primary.light;
      break;
    case 'primary-dark':
      iconColor = primary.dark;
      break;
    case 'secondary':
      iconColor = secondary.main;
      break;
    case 'secondary-light':
      iconColor = secondary.light;
      break;
    case 'secondary-dark':
      iconColor = secondary.dark;
      break;
    case 'success':
      iconColor = success.main;
      break;
    case 'error':
      iconColor = error.main;
      break;
    case 'warning':
      iconColor = warning.main;
      break;
    case 'white':
      iconColor = common.white;
      break;
    case 'gold':
      iconColor = gold.main;
      break;
    case 'silver':
      iconColor = silver.main;
      break;
    case 'bronze':
      iconColor = bronze.main;
      break;
    default:
      iconColor = color;
      break;
  }
  return iconColor;
};
