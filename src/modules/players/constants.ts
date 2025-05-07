import { IPlayer } from 'types';

export enum PAGES {
  PLAYER = 'Player',
  ADD_PLAYER = 'Add Player',
  EDIT_PLAYER = 'Edit Player',
  EDIT_PLAYER_PHOTO = 'Edit Player Photo',
  DELETE_PLAYER = 'Delete Player',
}

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

export enum POSITIONS {
  'GK' = 4,
  'DF' = 3,
  'MF' = 2,
  'FW' = 1,
}
