export interface ITeamDetailsInput {
  teamName: string;
  yearFounded: number | string;
  location: string;
  country: string;
  stadiumName?: string;
  stadiumLocation?: string;
  stadiumCapacity?: string;
  stadiumSurface?: string;
  homeShirt: string;
  homeShorts: string;
  homeSocks: string;
  awayShirt: string;
  awayShorts: string;
  awaySocks: string;
  kitsBackground: string;
  isActive: boolean;
}

export interface IDeleteTeamForm {
  teamName: string;
}
