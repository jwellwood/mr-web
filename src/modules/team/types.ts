import { IImage } from '../../components/avatars/image-avatar/types';

export interface ITeam {
  id?: string;
  _id?: string;
  orgId: string;
  teamBadge?: IImage;
  teamName: string;
  yearFounded: string;
  location: string;
  country: string;
  stadiumName?: string;
  stadiumLocation?: string;
  stadiumCapacity?: string;
  stadiumSurface?: string;
  homeShirt?: string;
  homeShorts?: string;
  homeSocks?: string;
  awayShirt?: string;
  awayShorts?: string;
  awaySocks?: string;
  kitsBackground: string;
  teamRoles?: unknown[];
  isActive?: boolean;
}
