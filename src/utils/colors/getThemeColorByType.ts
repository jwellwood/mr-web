import { theme } from '../../theme';

const {
  palette: { primary, secondary, success, warning, error, gold, silver, bronze },
} = theme;

export function getThemeColorByType(background?: string): string {
  let backgroundColor = 'transparent';
  switch (background) {
    case 'primary':
      backgroundColor = primary.main;
      break;
    case 'secondary':
      backgroundColor = secondary.light;
      break;
    case 'success':
      backgroundColor = success.main;
      break;
    case 'warning':
      backgroundColor = warning.main;
      break;
    case 'error':
      backgroundColor = error.main;
      break;
    case 'gold':
      backgroundColor = gold.main;
      break;
    case 'silver':
      backgroundColor = silver.main;
      break;
    case 'bronze':
      backgroundColor = bronze.main;
      break;
    default:
      break;
  }
  return backgroundColor;
}
