import { theme } from '../../theme';

export const colorMap = {
  label: String(theme.palette.label.main),
  data: String(theme.palette.data.main),
  primary: String(theme.palette.primary.main),
  secondary: String(theme.palette.secondary.main),
  tertiary: String(theme.palette.tertiary.main),
  success: String(theme.palette.success.main),
  warning: String(theme.palette.warning.main),
  error: String(theme.palette.error.main),
  white: String(theme.palette.common.white),
  gold: String(theme.palette.gold.main),
  silver: String(theme.palette.silver.main),
  bronze: String(theme.palette.bronze.main),
} as const;

export const sizeMap = {
  xxs: '10px',
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const;

export type ColorToken = keyof typeof colorMap | (string & {});
export type SizeToken = keyof typeof sizeMap | (string & {});

export const getColor = (tokenOrColor?: string) =>
  (colorMap as Record<string, string>)[String(tokenOrColor)] ??
  String(tokenOrColor ?? colorMap.primary);
export const getSize = (tokenOrSize?: string) =>
  (sizeMap as Record<string, string>)[String(tokenOrSize)] ??
  (typeof tokenOrSize === 'string' && tokenOrSize.endsWith('px') ? tokenOrSize : sizeMap.sm);
