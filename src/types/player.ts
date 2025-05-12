import type { IImage } from './image';
import { TPosition } from '../modules/players/constants.ts';

export interface IPlayer {
  _id: string;
  name: string;
  squadNumber: string;
  position: TPosition;
  image: IImage;
  nationality: string;
  dateOfBirth: string;
  yearJoined: string;
  isActive: boolean;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isHallOfFame?: boolean;
  seasonIds?: {
    _id: string;
    name: string;
  }[];
}
