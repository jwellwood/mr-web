import { DeepOmitTypename } from '../../../utils';
import { Add_TeamDocument, type Add_TeamMutation } from './ADD_TEAM.generated';
import { Delete_TeamDocument, type Delete_TeamMutation } from './DELETE_TEAM.generated';
import { Edit_TeamDocument, type Edit_TeamMutation } from './EDIT_TEAM.generated';
import { Edit_Team_BadgeDocument, type Edit_Team_BadgeMutation } from './EDIT_TEAM_BADGE.generated';
import { Fetch_TeamDocument, type Fetch_TeamQuery } from './FETCH_TEAM.generated';

export {
  Fetch_TeamDocument as FETCH_TEAM,
  Add_TeamDocument as ADD_TEAM,
  Edit_TeamDocument as EDIT_TEAM,
  Edit_Team_BadgeDocument as EDIT_TEAM_BADGE,
  Delete_TeamDocument as DELETE_TEAM,
};
// export types
export type T_FETCH_TEAM_QUERY = DeepOmitTypename<Fetch_TeamQuery>;
export type T_ADD_TEAM_MUTATION_INPUT = DeepOmitTypename<Add_TeamMutation>;
export type T_EDIT_TEAM_MUTATION_INPUT = DeepOmitTypename<Edit_TeamMutation>;
export type T_EDIT_TEAM_BADGE_MUTATION_INPUT = DeepOmitTypename<Edit_Team_BadgeMutation>;
export type T_DELETE_TEAM_MUTATION_INPUT = DeepOmitTypename<Delete_TeamMutation>;
