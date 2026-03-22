import { Theme } from '@mui/material';

export const getTypeStyles = (theme: Theme, type: string) => {
  const typeStyles: Record<
    string,
    { background: string; border: string; titleBackground: string; titleTextColor: string }
  > = {
    winner: {
      background: `linear-gradient(315deg, ${theme.palette.warning.light} 0%, ${theme.palette.secondary.dark} 12%, ${theme.palette.dark.main} 100%)`,
      border: 'rgba(234,162,33, 1) 1px solid',
      titleBackground: `linear-gradient(315deg, ${theme.palette.warning.light} 0%, ${theme.palette.secondary.dark} 12%, ${theme.palette.dark.main} 100%)`,
      titleTextColor: 'data',
    },
    success: {
      background: theme.palette.secondary.dark,
      border: `${theme.palette.primary.dark} 2px solid`,
      titleBackground: theme.palette.primary.main,
      titleTextColor: 'dark',
    },
    delete: {
      background: theme.palette.secondary.dark,
      border: 'rgba(255, 0, 0, 0.8) 1px solid',
      titleBackground: theme.palette.secondary.main,
      titleTextColor: 'data',
    },
    info: {
      background: theme.palette.secondary.dark,
      border: `${theme.palette.info.main} 1px solid`,
      titleBackground: theme.palette.secondary.main,
      titleTextColor: 'data',
    },
    admin: {
      background: theme.palette.secondary.dark,
      border: `${theme.palette.tertiary.main} 1px solid`,
      titleBackground: theme.palette.tertiary.main,
      titleTextColor: 'dark',
    },
    form: {
      background: theme.palette.secondary.dark,
      border: `${theme.palette.secondary.light} 0.5px solid`,
      titleBackground: theme.palette.secondary.main,
      titleTextColor: 'data',
    },
    default: {
      background: theme.palette.secondary.dark,
      border: `${theme.palette.secondary.light} 0.5px solid`,
      titleBackground: theme.palette.secondary.main,
      titleTextColor: 'data',
    },
  };

  const { background, border, titleBackground, titleTextColor } =
    typeStyles[type] || typeStyles.default;
  return { background, border, titleBackground, titleTextColor };
};
