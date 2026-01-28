import { IImage } from '../../components/avatars/image-avatar/types';
import { DeepOmitTypename } from '../../utils';

import { type Fetch_TeamQuery } from './graphql/FETCH_TEAM.generated';
import { type Add_TeamMutation } from './graphql/ADD_TEAM.generated';
import { type Edit_TeamMutation } from './graphql/EDIT_TEAM.generated';
import { type Edit_Team_BadgeMutation } from './graphql/EDIT_TEAM_BADGE.generated';
import { type Delete_TeamMutation } from './graphql/DELETE_TEAM.generated';

export type FETCH_TEAM_QUERY = DeepOmitTypename<Fetch_TeamQuery>;
export type ADD_TEAM_MUTATION_INPUT = DeepOmitTypename<Add_TeamMutation>;
export type EDIT_TEAM_MUTATION_INPUT = DeepOmitTypename<Edit_TeamMutation>;
export type EDIT_TEAM_BADGE_MUTATION_INPUT = DeepOmitTypename<Edit_Team_BadgeMutation>;
export type DELETE_TEAM_MUTATION_INPUT = DeepOmitTypename<Delete_TeamMutation>;

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
