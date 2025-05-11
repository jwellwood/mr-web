import {IPlayer} from "../../types";

export const PAGES = {
  PLAYER: 'Player',
  ADD_PLAYER: 'Add Player',
  EDIT_PLAYER: 'Edit Player',
  EDIT_PLAYER_PHOTO: 'Edit Player Photo',
  DELETE_PLAYER: 'Delete Player',
} as const;

const date = new Date();

export const initialPlayerState: Partial<IPlayer> = {
  name: '',
  yearJoined: new Date().getFullYear().toString(),
  nationality: '',
  position: 'DF',
  squadNumber: '1',
  dateOfBirth: date.toDateString(),
  isActive: true,
  isCaptain: false,
  isViceCaptain: false,
  isHallOfFame: false,
  seasonIds: [],
};

export const POSITIONS = {
  'GK': 'GK',
  'DF': 'DF',
  'MF': 'MF',
  'FW': 'FW',
  'NONE': 'NONE',
} as const;

export type TPosition = typeof POSITIONS[keyof typeof POSITIONS];