import { IPlayer } from '../../../types';

const date = new Date();

export const initialPlayerState: Partial<IPlayer> = {
  name: '',
  yearJoined: new Date().getFullYear().toString(),
  nationality: '',
  position: 'DF',
  squadNumber: '1',
  dateOfBirth: date.toDateString(),
  isCaptain: false,
  isViceCaptain: false,
  isHallOfFame: false,
  seasonIds: [],
};
