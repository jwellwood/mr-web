import { DeepOmitTypename } from '../../../../../utils';
import {
  Fetch_Team_Admin_ViewDocument as FETCH_TEAM_ADMIN_VIEW,
  Fetch_Team_Admin_ViewQuery,
} from './FETCH_TEAM_ADMIN_VIEW.generated';
import {
  Set_Team_Admin_Access_CodeDocument as SET_TEAM_ADMIN_ACCESS_CODE,
  type Set_Team_Admin_Access_CodeMutation,
} from './SET_TEAM_ADMIN_ACCESS_CODE.generated';

export { FETCH_TEAM_ADMIN_VIEW, SET_TEAM_ADMIN_ACCESS_CODE };

export type T_FETCH_TEAM_ADMIN_VIEW = DeepOmitTypename<Fetch_Team_Admin_ViewQuery>;
export type T_SET_TEAM_ADMIN_ACCESS_CODE = DeepOmitTypename<Set_Team_Admin_Access_CodeMutation>;
