import { DeepOmitTypename } from '../../../utils';
import { Request_Team_Admin_AccessMutation } from './REQUEST_TEAM_ADMIN_ACCESS.generated';

export { Fetch_TeamDocument as FETCH_TEAM } from './FETCH_TEAM.generated';

export { Add_TeamDocument as ADD_TEAM } from './ADD_TEAM.generated';
export { Edit_TeamDocument as EDIT_TEAM } from './EDIT_TEAM.generated';
export { Edit_Team_BadgeDocument as EDIT_TEAM_BADGE } from './EDIT_TEAM_BADGE.generated';
export { Delete_TeamDocument as DELETE_TEAM } from './DELETE_TEAM.generated';

export {
  Request_Team_Admin_AccessDocument as REQUEST_TEAM_ADMIN_ACCESS,
  type Request_Team_Admin_AccessMutation,
} from './REQUEST_TEAM_ADMIN_ACCESS.generated';

export type T_REQUEST_TEAM_ADMIN_ACCESS = DeepOmitTypename<Request_Team_Admin_AccessMutation>;
