import type {IImage} from "./image.ts";
import type {IOrganization} from "./organization.ts";

export interface ITeamRoles {
  name: string;
  role: string;
  contact?: string;
  roleId: string;
}

export interface ITeam {
  id?: string;
  _id?: string;
  orgId: string;
  teamBadge?: IImage;
  teamName: string;
  yearFounded: number;
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
  teamRoles?: ITeamRoles[];
  isActive?: boolean;
}

export interface ITeamResponse extends Omit<ITeam, 'orgId'> {
  orgId: IOrganization;
}
