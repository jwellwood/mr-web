import { theme } from '../../theme';
import { IAward, ITrophy } from './types';

// Replace the enum with this const object
export const PAGES = {
  TROPHY: 'Trophy',
  ADD_TROPHY: 'Add New Trophy',
  EDIT_TROPHY: 'Edit Trophy',
  SEASON: 'Season',
  EDIT_SEASON: 'Edit Season',
  ADD_SEASON: 'Add New Season',
  AWARD: 'Award',
  ADD_AWARD: 'Add Season Award',
  EDIT_AWARD: 'Edit Season Award',
} as const;

// Add this type to get the same type safety as an enum
export type PAGES_TYPE = (typeof PAGES)[keyof typeof PAGES];

export const initialTrophyFormState: Partial<ITrophy> = {
  name: '',
  seasonId: '',
  year: '',
  isFinal: false,
  isWinner: true,
  opponent: '',
  comment: '',
};

export const initialAwardState: Partial<IAward> = {
  awardName: '',
  winners: [],
  comment: '',
};

export const seasonColors = [
  {
    color: `${theme.palette.tertiary.main}`,
    border: `${theme.palette.tertiary.main}`,
  },
  {
    color: `${theme.palette.primary.main}`,
    border: `${theme.palette.primary.main}`,
  },
  {
    color: `${theme.palette.info.main}`,
    border: `${theme.palette.info.light}`,
  },
  {
    color: `${theme.palette.secondary.main}`,
    border: `${theme.palette.secondary.light}`,
  },
];
