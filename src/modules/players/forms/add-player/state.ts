import { PlayerFormData } from './validation';

const date = new Date();

export const initialPlayerState: PlayerFormData = {
  name: '',
  yearJoined: date,
  nationality: '',
  position: 'DF',
  squadNumber: '1',
  dateOfBirth: date,
  isCaptain: false,
  isViceCaptain: false,
  isHallOfFame: false,
  seasonIds: [],
};
