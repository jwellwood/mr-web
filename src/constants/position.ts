export const positionOptions = [
  { value: '', label: '' },
  { value: 'GK', label: 'Goalkeeper' },
  { value: 'DF', label: 'Defender' },
  { value: 'MF', label: 'Midfielder' },
  { value: 'FW', label: 'Forward' },
] as const;

export const POSITIONS = {
  GK: 'GK',
  DF: 'DF',
  MF: 'MF',
  FW: 'FW',
  NONE: '',
} as const;

export type TPosition = (typeof POSITIONS)[keyof typeof POSITIONS];
