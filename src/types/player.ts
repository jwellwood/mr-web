import type { IImage } from './image';
export interface IPlayer {
  _id: string;
  name: string;
  squadNumber: string;
  position: string;
  image: IImage;
  nationality: string;
  dateOfBirth: string;
  yearJoined: string;
  isActive: boolean;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isHallOfFame?: boolean;
  seasonIds?: object[];
}
